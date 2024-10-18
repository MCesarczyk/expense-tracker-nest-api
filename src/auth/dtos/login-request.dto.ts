import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginPayload } from 'src/auth/entities/login-payload.entity';

export class LoginRequestDto implements LoginPayload {
  @ApiProperty({
    type: String,
    example: `janusznosacz@example.com`,
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Password1!',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
