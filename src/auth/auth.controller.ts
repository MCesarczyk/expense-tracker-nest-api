import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from 'src/auth/dtos/login-response.dto';
import { LoginRequestDto } from 'src/auth/dtos/login-request.dto';
import { TokenResponse } from 'src/auth/entities/token-response.entity';
import { SkipAuth } from 'src/common/skip-auth';

@ApiTags('auth')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiResponse({
    type: LoginResponseDto,
  })
  @SkipAuth()
  async login(
    @Body() { email, password }: LoginRequestDto,
  ): Promise<TokenResponse> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return await this.authService.generateAccessToken(user);
  }
}