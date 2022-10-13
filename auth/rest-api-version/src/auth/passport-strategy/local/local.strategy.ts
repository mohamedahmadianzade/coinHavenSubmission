import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../service/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string,): Promise<any> {
    let user = await this.authService.validateUser(username, password);
    if (!user.result) throw new UnauthorizedException(user.message);
    return user.result;
  }
}
