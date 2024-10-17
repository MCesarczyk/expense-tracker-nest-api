import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Status } from './entities/status.entity';

@ApiTags('health')
@Controller({ version: '1', path: 'health' })
export class HealthCheckController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @ApiOkResponse({
    type: Status,
  })
  @ApiOperation({
    summary: 'Returns current status of backend application',
    tags: ['health'],
  })
  healthCheck() {
    return this.health.check();
  }
}
