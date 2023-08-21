import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service'; // Assuming you have an AuthService
import { Member } from 'src/chat/member/entities/member.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // The default behavior for passport-local is to expect 'username' and 'password' fields in the request.
  }

  async validate(username: string, password: string): Promise<Member> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
