import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthCheckController {
  constructor(private health: HealthCheckService) {}

  @Get()
  healthCheck() {
    return this.health.check();
  }
}
