import {
  ChatRequest,
  ChatResponse,
  Description,
  OpenAIChat,
} from '../../infra/types/openai.interface';
import OpenAI from 'openai';
import { Inject, Injectable } from '@nestjs/common';
import { EnvConfigService } from '../../../../infra/env-config/env-config.service';
import { PayloadProps } from 'src/infra/models/payload-props';
import { AuthRequest } from 'src/infra/models/auth-request';
import { OpenaiRepository } from '../../infra/repositories/openai.repository';

@Injectable()
export class OpenaiService {
  private openaiService: OpenAI;

  constructor(
    @Inject('OpenaiRepository')
    private readonly openaiRepository: OpenaiRepository,
    private readonly envConfigService: EnvConfigService,
  ) {
    const apiKey = this.envConfigService.getGPTAPIKey();
    this.openaiService = new OpenAI({
      apiKey,
    });
  }

  async getMessageData(request: ChatRequest): Promise<OpenAI.ChatCompletion> {
    const response = await this.openaiService.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 2048,
      temperature: 0.8,
      messages: request.messages,
    });
    return response;
  }

  async getChatOpenaiResponse(
    message: OpenAI.ChatCompletion,
  ): Promise<ChatResponse> {
    const result = message?.choices?.length && message?.choices[0];
    const response = {
      success: !!result,
      result,
    };
    return response;
  }

  async validateAuthentication(auth: boolean, authUser: PayloadProps) {
    if (auth) return authUser;
  }

  async saveDescription(
    req: AuthRequest<PayloadProps>,
    content: Description,
  ): Promise<OpenAIChat> {
    const data: OpenAIChat = {
      success: !!content,
      message: {
        role: req.user.role_gpt_generate,
        content: content.prompt,
      },
      result: {
        message: {
          role: 'assistant',
          content: content.content,
        },
      },
    };
    /**
     * Fazer verificação pelo _id da mensagem
     */
    return await this.openaiRepository.save(data);
  }

  async findContents(): Promise<OpenAIChat[]> {
    const contents = await this.openaiRepository.findAll();
    if (!contents) {
      throw new Error('A lista de descrições está vazia');
    }
    return contents;
  }

  async removeHistory(): Promise<any> {
    return; //await this.openaiRepository.deleteMany({});
  }
}
