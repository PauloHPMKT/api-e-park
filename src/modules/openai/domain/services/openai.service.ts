import OpenAI from 'openai';
import { Inject, Injectable } from '@nestjs/common';
import {
  ChatRequest,
  ChatResponse,
  OpenAIChat,
} from '../../infra/types/openai.interface';
import { EnvConfigService } from '../../../../infra/env-config/env-config.service';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';

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
    const prompt = request.messages[0];
    const promptData = await this.openaiModel.create({ message: prompt });

    const response = await this.openaiService.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 2048,
      temperature: 0.8,
      messages: request.messages,
    });

    await this.saveResponseToOpenaiModel(promptData._id.toString(), response);
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

  async saveResponseToOpenaiModel(
    id: string,
    response: OpenAI.ChatCompletion,
  ): Promise<void> {
    const data = {
      success: !!response,
      'result.message': response['choices'][0].message,
      'result.updated_at': new Date(),
    };
    await this.openaiModel
      .updateOne({ _id: new ObjectId(id) }, { $set: data })
      .exec();
  }

  async getHistory(): Promise<any> {
    return await this.openaiModel.find();
  }

  async removeHistory(): Promise<any> {
    return await this.openaiModel.deleteMany({});
  }
}
