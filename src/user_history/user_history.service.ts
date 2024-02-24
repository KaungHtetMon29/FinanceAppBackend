import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserHistoryDto } from './dto/create-user_history.dto';
import { UpdateUserHistoryDto } from './dto/update-user_history.dto';
import mongoose, { Model, ObjectId } from 'mongoose';
import UserHistoryInterface from './interfaces/user_history.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UserBalanceInterface } from 'src/user_balance/interfaces/users.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserHistoryService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @Inject('USER_MODEL')
    private userModel: Model<User>,

    @Inject('USER_BALANCE_MODEL')
    private userBalanceModel: Model<UserBalanceInterface>,

    @Inject('USER_HISTORY_MODEL')
    private userHistoryModel: Model<UserHistoryInterface>,
  ) {}
  async create(createUserHistoryDto: CreateUserHistoryDto) {
    const user = await this.userModel.findOne({
      _id: createUserHistoryDto.user,
    });
    console.log(user);
    const userbalance = await this.userBalanceModel.findOne({
      _id: createUserHistoryDto.ubid,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!userbalance) {
      throw new NotFoundException('User balance not found');
    }
    const userBalance: UserBalanceInterface =
      await this.userBalanceModel.findOne({
        _id: createUserHistoryDto.ubid,
      });
    console.log(userBalance);
    switch (createUserHistoryDto.type) {
      case '+':
        userBalance.balance += createUserHistoryDto.cost;
        break;
      case '-':
        userBalance.balance -= createUserHistoryDto.cost;
        break;
    }
    console.log(userBalance);
    await new this.userBalanceModel(userBalance).save();
    const userHistory = await new this.userHistoryModel(createUserHistoryDto);
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

  async findOne(id: ObjectId) {
    console.log('id: ', id);
    return `This action returns a #${id} userHistory`;
  }

  async update(id: ObjectId, updateUserHistoryDto: UpdateUserHistoryDto) {
    return `This action updates a #${id} userHistory`;
  }

  async remove(id: number) {
    return `This action removes a #${id} userHistory`;
  }
}
