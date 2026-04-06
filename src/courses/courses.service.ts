import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  // Once the schema is created,inject a User model into the userService using the @InjectModel() decorator
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.courseModel.create({
      name:createCourseDto.name,
      description:createCourseDto.description,
      level:createCourseDto.level,
      price:createCourseDto.price
    }); 
  }

  async findAll() {
    return await this.courseModel.find();
  }

  async findOne(id: string) {
    return this.courseModel.findOne({_id:id});
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      { returnDocument: 'after' } //returns updated document
    );

    if (!updatedCourse) {
      throw new NotFoundException('Course not found');
    }
    return {
      message: 'Course updated successfully',
      data: updatedCourse,
    };
  }

  async remove(id: string) {
    const deletedCourse=await this.courseModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      throw new NotFoundException('Course not found');
    }
    return {
      message: 'Course deleted successfully',
      data: deletedCourse,
    };
  }
}
