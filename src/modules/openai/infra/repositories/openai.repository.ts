import OpenAI from 'openai';
import { ChatRequest } from '../types/openai.interface';

export interface OpenaiRepository {
  getMessageData(messageBody: ChatRequest): Promise<OpenAI.ChatCompletion>;
}
