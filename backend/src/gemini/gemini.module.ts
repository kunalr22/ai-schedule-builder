import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GoogleGenAI } from '@google/genai';
import { GeminiController } from './gemini.controller';

@Module({
  providers: [
    {
      provide: GoogleGenAI,
      useFactory: () => new GoogleGenAI({}),
    },
    GeminiService,
  ],
  exports: [GoogleGenAI, GeminiService],
  controllers: [GeminiController],
})
export class GeminiModule {}
