import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GeminiModule } from './gemini/gemini.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [DatabaseModule, GeminiModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
