import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserHistoryService } from './user_history.service';
import { CreateUserHistoryDto } from './dto/create-user_history.dto';
import { UpdateUserHistoryDto } from './dto/update-user_history.dto';
import { ObjectId } from 'mongoose';

@Controller({ path: 'user-history', version: '1' })
export class UserHistoryController {
  constructor(private readonly userHistoryService: UserHistoryService) {}

  @Post()
  create(@Body() createUserHistoryDto: CreateUserHistoryDto) {
    return this.userHistoryService.create(createUserHistoryDto);
  }

  @Get()
  findAll() {
    return this.userHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateUserHistoryDto: UpdateUserHistoryDto,
  ) {
    return this.userHistoryService.update(id, updateUserHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userHistoryService.remove(+id);
  }
}
