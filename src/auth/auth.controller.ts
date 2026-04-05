import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth') //  /auth/register
export class AuthController {
    authService:AuthService // or we use only -> constructor(private readonly authService:authService){}
    constructor(authService:AuthService){
        this.authService=authService;
    }
    @Post('register')
    async register(@Body() registerUserDto:RegisterDto) {
        const token=await this.authService.registerUser(registerUserDto);
        return token;
    }

}
