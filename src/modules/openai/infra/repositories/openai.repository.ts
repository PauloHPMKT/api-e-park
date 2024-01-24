import { OpenAIChat } from '../types/openai.interface';

export interface OpenaiRepository {
  save(content: OpenAIChat): Promise<OpenAIChat>;
  findAll(): Promise<OpenAIChat[]>;
}
