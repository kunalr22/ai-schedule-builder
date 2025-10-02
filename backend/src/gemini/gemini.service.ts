import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { GeminiStructuredOutput } from './dto/gemini-structured-output.dto';

@Injectable()
export class GeminiService {
    constructor(private readonly ai: GoogleGenAI) {}

    async generateEventJsonFromPrompt(
        prompt: string,
    ): Promise<GeminiStructuredOutput> {
        const currentDate = new Date().toString();
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `A user has an event scheduled for some future time: ${prompt}.
                                Today is ${currentDate}.
                                Generate JSON for that object based on the provided schema.
                                Make the title and description "cleaned up" and professional looking.
                                You may leave the description and location an an empty string if insufficient information is provided.
                                Generate the recurrence rule based on the iCalendar RFC specification.
                                Include start of recurrence time as DTSTART, end time as UNTIL, and days of week, interval, and count in the rrules as per iCalendar RFC specification.
                                Ensure dtstart and until are written as yyyy-mm-dd                              
                                Leave the UNTIL field empty if it is a single-time event.
                                Assume standalone, singular events unless specified to be repeating, contextually.
                                Default to a count of 30 for repeating events with unspecified counts.
                                When specific times of the day are mentioned, write the times (hhmmss) in the timeStart and timeEnd fields.
                                Set timeEnd to be 1 hour after timeStart if not specified.
                                `,
                        },
                    ],
                },
            ],
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        location: { type: 'string' },
                        dtstart: { type: 'string' },
                        until: { type: 'string' },
                        rrule: { type: 'string' },
                        timeStart: { type: 'string' },
                        timeEnd: { type: 'string' },
                    },
                    required: ['title', 'dtstart', 'until', 'rrule'],
                },
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        });
        if (!response.text) throw new Error('Gemini response failure.');

        return JSON.parse(response.text);
    }
}
