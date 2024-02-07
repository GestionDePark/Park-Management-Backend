import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('token')
    getToken(@Body() credentials: { email: string; password: string }) {
        return this.authService.signIn(credentials.email, credentials.password);
    }
}
