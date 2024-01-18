import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';
import { PayloadProps } from 'src/infra/models/payload-props';
import { UserFromJwt } from 'src/infra/models/user-from-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly envConfigService: EnvConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfigService.getSecretKey(),
    });
  }

  async validate(payload: PayloadProps): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      role_gpt_generate: payload.role_gpt_generate,
    };
  }
}
