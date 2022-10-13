import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.model';
import { LoginModel } from '../controller/model/login.dto';
import { VerifyTokenModel } from '../controller/model/verifyToken.model';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(loginModel: LoginModel): Promise<any> {
    let user = await this.userService.getByUsername(loginModel.username);
    if (!user) throw new Error('username is not valid!');
    if (!bcrypt.compareSync(loginModel.password, user.password)) {
      throw new Error('password is not valid');
    }

    return this.generateJwtToken(user);
  }

  async me(token: any[]) {
    let userId = this.getUserIdFromToken(token);
    let userInfo = await this.userService.getByUserId(userId);
    return userInfo;
  }

  async verifyToken(verifyTokenModel: VerifyTokenModel) {
    try {
      this.jwtService.verify(verifyTokenModel.token);
      return {
        message: 'The token is valid',
        token:verifyTokenModel.token
      };
    } catch (error) {
      return {
        message: 'The token is not valid',
        token:verifyTokenModel.token
      };
    }
  }

  private getUserIdFromToken(token: any[]) {
    if (!token || token.length != 1) throw new Error('Please provide JWT token');
    let jwtToken;
    try {
      jwtToken = this.jwtService.decode(
        token[0].toString().replace('Bearer ', ''),
      );
    } catch (error) {
      Error('Jwt token is not valid');
    }

    if (!jwtToken || !jwtToken.sub) throw new Error('Jwt token is not valid');
    return jwtToken.sub;
  }

  private generateJwtToken(user: User) {
    return {
      username: user.username,
      token: this.jwtService.sign({
        username: user.username,
        sub: user.userId,
      }),
    };
  }
}
