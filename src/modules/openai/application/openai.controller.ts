import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OpenaiService } from '../domain/services/openai.service';
import { ChatRequest, ChatResponse } from '../infra/types/openai.interface';
import OpenAI from 'openai';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('/chat')
  @HttpCode(HttpStatus.OK)
  async getChatOpenai(@Body() request: ChatRequest): Promise<ChatResponse> {
    const getMessages = (await this.openaiService.getMessageData(
      request,
    )) as OpenAI.ChatCompletion;
    return await this.openaiService.getChatOpenaiResponse(getMessages);
  }
}
