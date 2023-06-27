import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../infra/services/Login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body) {
    return await this.loginService.login(body);
  }
}