import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TokenResponse } from 'src/auth/entities/token-response.entity';

export class LoginResponseDto implements TokenResponse {
  @ApiProperty({
    type: String,
    readOnly: true,
  })
  @IsString()
  access_token!: string;
}
