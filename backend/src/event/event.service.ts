import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Prisma } from '@prisma/client';
import { RRule } from 'rrule';
import * as chrono from 'chrono-node';
import { GeminiService } from 'src/gemini/gemini.service';
import { GeminiStructuredOutput } from 'src/gemini/dto/gemini-structured-output.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventService {
    constructor(
        private readonly geminiService: GeminiService,
        private readonly databaseService: DatabaseService,
    ) {}

    async create(createEventDto: CreateEventDto) {
        const resJson: GeminiStructuredOutput =
            await this.geminiService.generateEventJsonFromPrompt(
                createEventDto.prompt,
            );

        const rule = RRule.fromString(resJson.rrule);
        const dtstart = chrono.parseDate(resJson.dtstart);
        const until = chrono.parseDate(resJson.until);

        if (dtstart) {
            rule.options.dtstart = dtstart;
            rule.origOptions = { ...rule.origOptions, dtstart };
        }
        if (until) {
            rule.options.until = until;
            rule.origOptions = { ...rule.origOptions, until };
        }

        // these values seem to be set to random numbers, so just reset them to 0
        rule.options.byhour = [0];
        rule.options.byminute = [0];
        rule.options.bysecond = [0];

        const eventObject: Prisma.EventCreateInput = {
            clerkId: 'placeholder',
            title: resJson.title,
            description: resJson.description,
            location: resJson.location,
            recurrenceRule: rule.toString(),
            timeStart: resJson.timeStart,
            timeEnd: resJson.timeEnd,
        };

        return this.databaseService.event.create({
            data: eventObject,
        });
    }

    findAll() {
        const clerkId = 'placeholder';
        return this.databaseService.event.findMany({
            where: {
                clerkId,
            },
        });
    }

    findOne(id: number) {
        // should later check if user actually owns the service once clerk implemented
        return this.databaseService.event.findFirst({
            where: {
                id,
            },
        });
    }

    update(id: number, updateEventDto: Prisma.EventUpdateInput) {
        // should later check if user actually owns the service once clerk implemented
        return this.databaseService.event.update({
            where: {
                id,
            },
            data: updateEventDto,
        });
    }

    remove(id: number) {
        return this.databaseService.event.delete({
            where: {
                id,
            },
        });
    }
}
