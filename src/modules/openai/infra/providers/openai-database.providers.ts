import { Connection } from 'mongoose';
import { OpenaiSchema } from '../schema/openai.schema';

export const openaiDbProviders = [
  {
    provide: 'OPENAI_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('OpenaiChat', OpenaiSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
