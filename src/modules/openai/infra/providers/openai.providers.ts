import { MongoOpenaiRepository } from 'src/modules/database/repositories/mongo-openai.repository';

export const openaiProviders = [
  {
    provide: 'OpenaiRepository',
    useClass: MongoOpenaiRepository,
  },
];
