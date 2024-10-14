import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>Welcome to Expense Tracker API!</h1>\
    <h2>Check out the <a href="/api/v1/docs">documentation</a></h2>`;
  }
}
