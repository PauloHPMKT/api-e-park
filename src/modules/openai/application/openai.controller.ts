import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  ChatRequest,
  ChatResponse,
  Description,
} from '../infra/types/openai.interface';
import { OpenaiService } from '../domain/services/openai.service';
import OpenAI from 'openai';
import { isPublic } from 'src/modules/auth/application/decorators/public.decorator';
import { AuthRequest } from 'src/infra/models/auth-request';
import { PayloadProps } from 'src/infra/models/payload-props';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('/chat')
  @isPublic()
  @HttpCode(HttpStatus.OK)
  async getChatOpenai(
    @Request() req: AuthRequest<PayloadProps>,
    @Body() message: ChatRequest,
  ): Promise<ChatResponse> {
    const getMessages = (await this.openaiService.getMessageData(
      message,
    )) as OpenAI.ChatCompletion;

    return await this.openaiService.getChatOpenaiResponse(getMessages);
  }

  @Post('/save-response')
  async saveResponse(
    @Request() req: AuthRequest<PayloadProps>,
    @Body() content: Description,
  ): Promise<void> {
    await this.openaiService.saveDescription(req, content);
  }

  @Get('/history')
  async getAllMessagesOpenAI(): Promise<any> {
    //console.log('teste');
    return await this.openaiService.findAll();
  }

  @Delete('/clean')
  async removeHistoryOpenAI(): Promise<any> {
    return await this.openaiService.removeHistory();
  }
}
