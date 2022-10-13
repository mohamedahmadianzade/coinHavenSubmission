import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.model';
import { LoginModel } from '../controller/model/login.dto';
import { VerifyTokenModel } from '../controller/model/verifyToken.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './model/token.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}
  async validateUser(loginModel: LoginModel): Promise<any> {
    let user = await this.userService.getByUsername(loginModel.username);
    if (!user) throw new Error('username is not valid!');
    if (!bcrypt.compareSync(loginModel.password, user.password)) {
      throw new Error('password is not valid');
    }

    return this.generateJwtToken(user);
  }

  async me(tokenParam: any[]) {
    let { userId, token } = this.getUserIdFromToken(tokenParam);
    let validation = await this.verifyToken({token});
    if (!validation.isValid) throw new Error('The token is not valid');
    let userInfo = await this.userService.getByUserId(userId);
    return userInfo;
  }

  async verifyToken(verifyTokenModel: VerifyTokenModel) {
    this.jwtService.verify(verifyTokenModel.token);
    let decoded = this.jwtService.decode(verifyTokenModel.token);
    let token = await this.tokenRepository.findOneBy({
      userId: decoded.sub,
      token: verifyTokenModel.token,
    });
    if (token.expired)
      return {
        isValid: !token.expired,
        message: 'token is not valid',
        token: verifyTokenModel.token,
      };
    else
      return {
        isValid: !token.expired,
        message: 'token is valid',
        token: verifyTokenModel.token,
      };
  }

  private getUserIdFromToken(token: any[]) {
    if (!token || token.length != 1)
      throw new Error('Please provide JWT token');
    let justTokenWithoutBeare = token[0].toString().replace('Bearer ', '');
    let jwtToken;
    try {
      jwtToken = this.jwtService.decode(justTokenWithoutBeare);
    } catch (error) {
      Error('Jwt token is not valid');
    }

    if (!jwtToken || !jwtToken.sub) throw new Error('Jwt token is not valid');
    return {
      userId: jwtToken.sub,
      token: justTokenWithoutBeare,
    };
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

  generateJwtToken(user: User) {
    let token = this.jwtService.sign({
      username: user.username,
      sub: user.userId,
    });
    this.saveToken(user.userId, token);
    return {
      username: user.username,
      token,
    };
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
}
