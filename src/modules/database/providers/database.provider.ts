import * as mongoose from 'mongoose';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [EnvConfigService],
    useFactory: async (
      envConfigService: EnvConfigService,
    ): Promise<typeof mongoose> =>
      mongoose.connect(envConfigService.getDbHost()),
  },
];
