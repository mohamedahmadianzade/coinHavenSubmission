import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/service/model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from './model/token.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  private salt: number;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    let user = await this.userService.getByUsername(username);
    if (!user)
      return {
        result: null,
        message: 'username is not valid',
      };
    if (!bcrypt.compareSync(pass, user.password)) {
      return {
        result: null,
        message: 'password is not valid',
      };
    }
    const { password, _id, ...result } = user;
    return {
      result,
      message: 'welcome to our System ' + user.fullName,
    };
  }

  async loginType2(username: string, pass: string) {
    let user = await this.userService.getByUsername(username);
    if (!user) throw new Error('username is not valid');
    if (!bcrypt.compareSync(pass, user.password)) {
      throw new Error('password is not valid');
    }

    let tokenResult = await this.generateJwtToken(user);
    return {
      userId: user.userId,
      ...tokenResult,
    };
  }

  /**
   * Get user information by decoding jwt token and implement validation
   *
   * @param {*} headerParameters
   * @return {*}
   * @memberof AuthService
   */
  async meType2(headerParameters) {
    if (
      !headerParameters.hasOwnProperty('authorization') ||
      headerParameters.hasOwnProperty('Authorization')
    )
      throw new Error('Jwt token should be set on header authorization key');
    const token = headerParameters['authorization'].replace('Bearer ', '');
    let validation = await this.verifyJwtToken(token);
    if (!validation.isValid) throw new Error('The token is not valid');

    let decoded = this.jwtService.decode(token);

    return this.userService.getByUserId(decoded.sub);
  }

  /**
   * save generated token in database for userId
   * Expire all previous token of that userId
   *
   * @private
   * @param {*} userId
   * @param {*} token
   * @memberof AuthService
   */
  private async saveToken(userId, token) {
    let tokenEntity = new TokenEntity();
    tokenEntity.createdAt = new Date().toISOString();
    tokenEntity.userId = userId;
    tokenEntity.token = token;
    await this.setAllUserTokenExpired(userId);
    this.tokenRepository.insert(tokenEntity);
  }

  /**
   * Expire all previouse generated token to userId
   *
   * @private
   * @param {*} userId
   * @memberof AuthService
   */
  private async setAllUserTokenExpired(userId) {
    await this.tokenRepository.update({ userId }, { expired: true });
  }

  /**
   *  generate new token
   *  expire all previous token of related use
   *  storenw token on database
   *
   * @param {User} user
   * @return {*}
   * @memberof AuthService
   */
  async generateJwtToken(user: User) {
    let token = this.jwtService.sign({
      username: user.username,
      sub: user.userId,
    });
    await this.saveToken(user.userId, token);
    return {
      username: user.username,
      access_token: token,
    };
  }
  async verifyJwtToken(access_token: string) {
    try {
      this.jwtService.verify(access_token);
      let decoded = this.jwtService.decode(access_token);
      let token = await this.tokenRepository.findOneBy({
        userId: decoded.sub,
        token: access_token,
      });
      if (token.expired)
        return {
          isValid: !token.expired,
          message: 'token is not valid',
        };
      else
        return {
          isValid: !token.expired,
          message: 'token is valid',
        };
    } catch (error) {
      return {
        isValid: false,
        message: error.message,
      };
    }
  }
}
