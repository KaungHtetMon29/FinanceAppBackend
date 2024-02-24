import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { CreateUserBalanceDto } from './dto/create-user_balance.dto';
import { UpdateUserBalanceDto } from './dto/update-user_balance.dto';
import { UserBalance } from './entities/user_balance.entity';
import { Model, ObjectId } from 'mongoose';
import { UserBalanceInterface } from './interfaces/users.interface';
import { User } from 'src/users/interfaces/users.interface';
import { throwError } from 'rxjs';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class UserBalanceService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @Inject('USER_MODEL')
    private userModel: Model<User>,

    @Inject('USER_BALANCE_MODEL')
    private userBalanceModel: Model<UserBalanceInterface>,
  ) {}
  // @UseFilters(new ItemnotFoundFilter())
  async create(createUserBalanceDto: CreateUserBalanceDto) {
    // const { userid, ...balance } = ;
    const user = await this.userModel.findOne({
      _id: createUserBalanceDto.user,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const userBalance = new this.userBalanceModel(createUserBalanceDto);
      console.log(userBalance);
      await userBalance.save();
      return await this.userBalanceModel
        .findById(userBalance._id)
        .populate('user', '-password');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    let userBalance = await this.cacheManager.get('userBalance');
    if (!userBalance) {
      userBalance = await this.userBalanceModel
        .find()
        .populate('user', '-password');
      await this.cacheManager.set('userBalance', userBalance);
    }
    return userBalance;
    // return `This action returns all userBalance`;
  }

  async findOne(id: ObjectId) {
    try {
      const user = await this.userBalanceModel.findOne({ _id: id });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      switch (error.name) {
        case 'NotFoundException':
          throw new NotFoundException('User Balance ID not found');
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }

  async update(id: ObjectId, updateUserBalanceDto: UpdateUserBalanceDto) {
    console.log(id);
    try {
      const user = await this.userBalanceModel.findOne({ _id: id });
      if (!user) {
        throw new NotFoundException('User Balance not found');
      }
      return await this.userBalanceModel
        .findOneAndUpdate({ _id: id }, updateUserBalanceDto, { new: true })
        .populate('user', '-password');
    } catch (error) {
      switch (error.name) {
        case 'NotFoundException':
          throw new NotFoundException('User Balance ID not found');
        case 'CastError':
          throw new BadRequestException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }

    // return `This action updates a #${id} userBalance`;
  }

  async remove(id: ObjectId) {
    return await this.userBalanceModel.findOneAndDelete({ _id: id });
    // return `This action removes a #${id} userBalance`;
  }
}
