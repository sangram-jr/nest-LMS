import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/user.types';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthGuard,RolesGuard)//protecting route(only authorized user access this endpoint)-> same as middleware and also i add RoleGuead for admin or student role
  @Roles(Role.admin)//only admin create courses
  async create(@Body() createCourseDto: CreateCourseDto) {
    const course=await this.coursesService.create(createCourseDto);
    return {
      message: 'Course created successfully',
      data: course,
    };
  }

  @Get()
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.coursesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard,RolesGuard)//protecting route(only authorized user access this endpoint)-> same as middleware and also i add RoleGuead for admin or student role
  @Roles(Role.admin)//only admin create courses
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.coursesService.update(id, updateCourseDto);  
  }

  @Delete(':id')
  @UseGuards(AuthGuard,RolesGuard)//protecting route(only authorized user access this endpoint)-> same as middleware and also i add RoleGuead for admin or student role
  @Roles(Role.admin)//only admin create courses
  async remove(@Param('id') id: string) {
    return await this.coursesService.remove(id);
  }
}
