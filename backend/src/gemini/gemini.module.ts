import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GoogleGenAI } from '@google/genai';

@Module({
    providers: [
        {
            provide: GoogleGenAI,
            useFactory: () => new GoogleGenAI({}),
        },
        GeminiService,
    ],
    exports: [GoogleGenAI, GeminiService],
})
export class GeminiModule {}
