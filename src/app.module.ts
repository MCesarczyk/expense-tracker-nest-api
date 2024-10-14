import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [HealthCheckModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
