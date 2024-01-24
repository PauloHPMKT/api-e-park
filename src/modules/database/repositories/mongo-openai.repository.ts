import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { OpenaiRepository } from 'src/modules/openai/infra/repositories/openai.repository';
import { OpenAIChat } from 'src/modules/openai/infra/types/openai.interface';

export class MongoOpenaiRepository implements OpenaiRepository {
  constructor(
    @Inject('OPENAI_MODEL') private readonly openaiModel: Model<OpenAIChat>,
  ) {}

  async save(content: OpenAIChat): Promise<OpenAIChat> {
    const response = await this.openaiModel.create(content);
    return response;
  }

  async findAll(): Promise<OpenAIChat[]> {
    return await this.openaiModel.find();
  }
}
