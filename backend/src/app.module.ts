import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [DatabaseModule, GeminiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
