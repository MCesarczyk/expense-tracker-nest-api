import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @ApiProperty({
    example: 'ok',
    description: 'Returns current status of backend application',
  })
  status: string;
}
