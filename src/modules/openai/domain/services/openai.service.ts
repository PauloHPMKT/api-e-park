import OpenAI from 'openai';
import { Inject, Injectable } from '@nestjs/common';
import {
  ChatRequest,
  ChatResponse,
  OpenAIChat,
} from '../../infra/types/openai.interface';
import { EnvConfigService } from '../../../../infra/env-config/env-config.service';
import { Model } from 'mongoose';
//import { ObjectId } from 'bson';
import { PayloadProps } from 'src/infra/models/payload-props';
import { AuthRequest } from 'src/infra/models/auth-request';

@Injectable()
export class OpenaiService {
  private openaiService: OpenAI;

  constructor(
    @Inject('OPENAI_MODEL') private readonly openaiModel: Model<OpenAIChat>,
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

  async saveResponseToOpenaiModel(
    req: AuthRequest<PayloadProps>,
    message: any,
  ): Promise<any> {
    console.log(message);
    const data = {
      success: !!message,
      message: {
        role: req.user.role_gpt_generate,
        content: message.prompt,
      },
      result: {
        message: {
          role: 'assistant',
          content: message.content,
        },
      },
    };

    console.log(data);
    // await this.openaiModel
    //   .updateOne({ _id: new ObjectId(id) }, { $set: data })
    //   .exec();
    return await this.openaiModel.create(data);
  }

  async findAll(): Promise<OpenAIChat[]> {
    return await this.openaiModel.find();
  }

  async removeHistory(): Promise<any> {
    return await this.openaiModel.deleteMany({});
  }
}
