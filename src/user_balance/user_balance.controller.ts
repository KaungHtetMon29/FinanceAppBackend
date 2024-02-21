import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserBalanceService } from './user_balance.service';
import { CreateUserBalanceDto } from './dto/create-user_balance.dto';
import { UpdateUserBalanceDto } from './dto/update-user_balance.dto';
import { ObjectId } from 'mongoose';

@Controller({ path: 'user_balance', version: '1' })
export class UserBalanceController {
  constructor(private readonly userBalanceService: UserBalanceService) {}

  @Post()
  create(@Body() createUserBalanceDto: CreateUserBalanceDto) {
    return this.userBalanceService.create(createUserBalanceDto);
  }

  @Get()
  findAll() {
    return this.userBalanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.userBalanceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateUserBalanceDto: UpdateUserBalanceDto,
  ) {
    return this.userBalanceService.update(id, updateUserBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBalanceService.remove(+id);
  }
}