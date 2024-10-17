import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { ExpenseModule } from './expense/expense.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [HealthCheckModule, ExpenseModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
