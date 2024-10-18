import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Status } from './entities/status.entity';
import { SkipAuth } from 'src/common/skip-auth';

@Controller({ version: '1', path: 'health' })
@ApiTags('health')
@SkipAuth()
export class HealthCheckController {
  constructor(private health: HealthCheckService) { }

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
