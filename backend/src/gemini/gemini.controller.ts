import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  getEventJson(@Body('prompt') prompt: String) {
    return this.geminiService.getEventJson(prompt);
  }
}
