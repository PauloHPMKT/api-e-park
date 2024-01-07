import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { ChatRequest, ChatResponse } from '../../infra/types/openai.interface';
import { EnvConfigService } from '../../../../infra/env-config/env-config.service';

@Injectable()
export class OpenaiService {
  private openaiService: OpenAI;

  constructor(private readonly envConfigService: EnvConfigService) {
    const apiKey = this.envConfigService.getGPTAPIKey();
    this.openaiService = new OpenAI({
      apiKey,
    });
  }

  async getMessageData(request: ChatRequest): Promise<OpenAI.ChatCompletion> {
    return await this.openaiService.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: request.messages,
    });
  }

  async getChatOpenaiResponse(
    message: OpenAI.ChatCompletion,
  ): Promise<ChatResponse> {
    return {
      success: true,
      result: message?.choices?.length && message?.choices[0],
    };
  }
}
