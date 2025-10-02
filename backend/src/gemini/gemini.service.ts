import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { RRule } from 'rrule';
import * as chrono from 'chrono-node';

interface EventJsonResponse {
    title: string;
    description: string;
    location: string;
    dtstart: string;
    until: string;
    rrule: string;
    timestart?: string;
    timeend?: string;
    // Add any other optional fields if needed
}

@Injectable()
export class GeminiService {
    constructor(private readonly ai: GoogleGenAI) {}

    async getEventJson(prompt: String) {
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
                                For repeating events, assume dtstart to and until to be the start and end of the entire day if not specified.
                                Assume standalone, singular events unless specified to be repeating, contextually.
                                Default to a count of 30 for repeating events with unspecified counts.
                                For repeating events with specific times of the day mentioned, write the times (hhmmss) in the timestart and timeend fields.
                                Set timeend to be 1 hour after timestart if not specified.
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
                        timestart: { type: 'string' },
                        timeend: { type: 'string' },
                    },
                    required: ['title', 'dtstart', 'until', 'rrule'],
                },
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        });

        // console.log(response.text);
        if (response.text) {
            const resJson: EventJsonResponse = JSON.parse(response.text);
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
            console.log('----------------------------------');
            console.log(resJson.dtstart, '-', resJson.until);
            console.log(dtstart, '-', until);
            console.log(rule.options.dtstart, '-', rule.options.until);
            console.log(resJson.title);
            console.log(resJson.description);
            console.log(rule.toString());
            console.log(rule.toText());
        }
    }
}
