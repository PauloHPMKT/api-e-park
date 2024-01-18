import { EnvConfigModule } from 'src/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';

export const jwtRegisterProvider = {
  imports: [EnvConfigModule],
  useFactory: async (envConfigService: EnvConfigService) => ({
    secret: process.env.JWT_SECRET || envConfigService.getSecretKey(),
    signOptions: { expiresIn: '24h' },
  }),
  inject: [EnvConfigService],
};
