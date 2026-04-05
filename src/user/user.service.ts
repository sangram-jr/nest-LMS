import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    // Once the schema is created,inject a User model into the userService using the @InjectModel() decorator
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerUserDto:RegisterDto){
        try {
           return await this.userModel.create({
                fname:registerUserDto.fname,
                lname:registerUserDto.lname,
                email:registerUserDto.email,
                password:registerUserDto.password
            }); 
        } catch (error) {
            const e= error as {code?:number};
            const DUPLICATE_KEY_CODE=11000;
            if(e.code===DUPLICATE_KEY_CODE){
                throw new ConflictException('Email Already Exist!')
            }
            throw error;
        }
        
    }
}
