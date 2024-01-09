import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { OpenaiService } from '../domain/services/openai.service';
import {
  ChatRequest,
  ChatResponse,
  OpenAIChat,
} from '../infra/types/openai.interface';
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

  @Get('/history')
  async getAllMessagesOpenAI(): Promise<OpenAIChat[]> {
    return await this.openaiService.findAll();
  }

  @Delete('/clean')
  async removeHistoryOpenAI(): Promise<any> {
    return await this.openaiService.removeHistory();
  }
}
