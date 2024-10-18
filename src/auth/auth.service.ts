import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayload } from 'src/auth/dtos/access-token-payload.dto';
import { TokenResponse } from 'src/auth/entities/token-response.entity';
import { UserData } from 'src/user/entities/user-data.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (await bcrypt.compare(password, user.password)) {
      this.logger.debug(`User ${email} authenticated`);
      const { password, ...userData } = user;
      return userData;
    }

    return null;
  }

  async generateAccessToken(user: UserData): Promise<TokenResponse> {
    const payload: AccessTokenPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
