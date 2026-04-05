import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth') 
export class AuthController {
    authService:AuthService;// or we use only -> constructor(private readonly authService:authService){}
    userService:UserService
    constructor(authService:AuthService,userService:UserService){
        this.authService=authService;
        this.userService=userService;
    }
    //  /auth/register
    @Post('register')
    async register(@Body() registerUserDto:RegisterDto) {
        const token=await this.authService.registerUser(registerUserDto);
        return token;
    }
    //  /auth/login
    @Post('login')
    async login(@Body() loginUserDto:LoginDto){
        const token=await this.authService.loginUser(loginUserDto);
        return token;
    }
    // /auth/profile
    @UseGuards(AuthGuard)//protecting route
    @Get('profile')
    async getProfile(@Request() req){
        //get the userId from token
        const userId=req.user.sub;
        const user=await this.userService.getUserById(userId);
        //console.log(user);
        //return user;
        //only return fname,lname,email -> not need password to show the user
        return {
            id:user?._id,
            fname:user?.fname,
            lname:user?.lname,
            email:user?.email
        }
    }


}
