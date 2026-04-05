import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private jwtService: JwtService
    ){}
    async registerUser(registerUserDto:RegisterDto){
        //register logic

        //console.log("register user:", registerUserDto);

        //hash the pass
        const salt=10;
        const hash=await bcrypt.hash(registerUserDto.password,salt);

        //Take all properties from registerUserDto and then override/add password
        const user=await this.userService.createUser({...registerUserDto,password:hash});
        //console.log('user:',user);

        //generate jwt token 
        const payload={ sub: user._id};
        const token=await this.jwtService.signAsync(payload);
        return {access_token:token};    
    }
}
