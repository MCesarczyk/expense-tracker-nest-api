import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from 'src/auth/dtos/access-token-payload.dto';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(
    payload: Pick<AccessTokenPayload, 'sub'> &
      Record<string, string | number | boolean | object>,
  ) {
    const { sub, ...rest } = payload;
    return { userId: sub, ...rest };
  }
}
