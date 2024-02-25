import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, ObjectId } from 'mongoose';
import { User } from './interfaces/users.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @Inject('USER_MODEL')
    private usersModel: Model<User>,
  ) {}
  private readonly logger: Logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto) {
    this.logger.log(`user create input: ${JSON.stringify(createUserDto)}`);
    const user = new this.usersModel(createUserDto);
    return user.save();
    // return await this.usersModel.findOneAndUpdate(
    //   { email: createUserDto.email },
    //   createUserDto,
    //   { upsert: true, new: true, runValidators: true },
    // );
  }

  async findAll() {
    let value = await this.cacheManager.get('users');
    if (value === undefined) {
      value = await this.usersModel.find().exec();
      await this.cacheManager.set('users', value);
    }
    console.log(value);
    return value;
  }

  async findOne(id: ObjectId) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.logger.log(`user update id input: ${JSON.stringify(id)}`);
    this.logger.log(`user update input: ${JSON.stringify(updateUserDto)}`);
    return await this.usersModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: ObjectId) {
    return await this.usersModel.findOneAndDelete({ _id: id });
    return `This action removes a #${id} user`;
  }
}
