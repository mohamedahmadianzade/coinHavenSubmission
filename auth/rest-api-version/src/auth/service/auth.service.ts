import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.model';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  private salt: number;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    let user = await this.userService.getByUsername(username);
    if (!user)
      return {
        result: null,
        message: 'username is not valid',
      };
    if (!bcrypt.compareSync(password, user.password)) {
      return {
        result: null,
        message: 'password is not valid',
      };
    }
    const { pass, ...result } = user;
    return {
      result,
    };
  }

  generateJwtToken(user: User) {
    return {
      username: user.username,
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.userId,
      }),
    };
  }
  verifyJwtToken(access_token: string) {
    try {
      this.jwtService.verify(access_token);
      return {
        isValid: true,
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
