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
import { ItemnotFoundFilter } from 'src/filters/ItemnotFound.filter';
import { throwError } from 'rxjs';

@Injectable()
export class UserBalanceService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    @Inject('USER_BALANCE_MODEL')
    private userBalanceModel: Model<UserBalanceInterface>,
  ) {}
  // @UseFilters(new ItemnotFoundFilter())
  async create(createUserBalanceDto: CreateUserBalanceDto) {
    const { userid, ...balance } = createUserBalanceDto;
    const user = await this.userModel.findOne({ _id: userid });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(balance);
    try {
      const userBalance = new this.userBalanceModel({ ...balance, user: user });
      console.log(userBalance);
      return await userBalance.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.userBalanceModel.find();
    return `This action returns all userBalance`;
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
        case 'CastError':
          throw new BadRequestException('Invalid User Balance ID');
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }

  async update(id: ObjectId, updateUserBalanceDto: UpdateUserBalanceDto) {
    return await this.userBalanceModel.findOneAndUpdate(
      { _id: id },
      updateUserBalanceDto,
      { new: true },
    );
    // return `This action updates a #${id} userBalance`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBalance`;
  }
}
