import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    const result = await this.$queryRaw<
      { current_database: string }[]
    >`SELECT current_database()`;
    console.log(`\n\nConnected to database: ${result[0].current_database}\n\n`);
  }
}
