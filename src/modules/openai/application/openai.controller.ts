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
import { OpenaiService } from '../domain/services/openai.service';
import { ChatRequest, ChatResponse } from '../infra/types/openai.interface';
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
    @Body() message: object,
  ): Promise<void> {
    //const authUser = req.user; // Isso depende do seu mecanismo de autenticação
    await this.openaiService.saveResponseToOpenaiModel(req, message);
  }
  // @Post('/save-response')
  // async saveDescription(
  //   @Request() req: AuthRequest<PayloadProps>,
  //   @Body() message: ChatRequest,
  // ): Promise<void> {
  //   console.log(req.user, message);
  //   //const authUser = req.user; // Isso depende do seu mecanismo de autenticação
  //   //await this.openaiService.saveResponseToOpenaiModel(req, message);
  // }

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
