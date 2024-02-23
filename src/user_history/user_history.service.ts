import { Inject, Injectable } from '@nestjs/common';
import { CreateUserHistoryDto } from './dto/create-user_history.dto';
import { UpdateUserHistoryDto } from './dto/update-user_history.dto';
import { Model, ObjectId } from 'mongoose';
import UserHistoryInterface from './interfaces/user_history.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class UserHistoryService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @Inject('USER_HISTORY_MODEL')
    private userHistoryModel: Model<UserHistoryInterface>,
  ) {}
  async create(createUserHistoryDto: CreateUserHistoryDto) {
    const userHistory = new this.userHistoryModel(createUserHistoryDto);
    await userHistory.save();
    return await this.userHistoryModel
      .findById(userHistory._id)
      .populate('ubid');
  }

  async findAll() {
    let userHistory = await this.cacheManager.get('userHistory');
    if (userHistory === undefined) {
      userHistory = await this.userHistoryModel.find().populate('ubid');
      await this.cacheManager.set('userHistory', userHistory);
    }
    return userHistory;
  }

  async findOne(id: number) {
    return `This action returns a #${id} userHistory`;
  }

  async update(id: ObjectId, updateUserHistoryDto: UpdateUserHistoryDto) {
    return `This action updates a #${id} userHistory`;
  }

  async remove(id: number) {
    return `This action removes a #${id} userHistory`;
  }
}
