import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    //load .env
    ConfigModule.forRoot(),
    //mongodb connection
    MongooseModule.forRoot(process.env.MONGODB_URL!),
    CoursesModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
