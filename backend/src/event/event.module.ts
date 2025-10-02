import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { GeminiModule } from 'src/gemini/gemini.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [GeminiModule, DatabaseModule],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}
