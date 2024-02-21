import { Module } from '@nestjs/common';
import { UserBalanceService } from './user_balance.service';
import { UserBalanceController } from './user_balance.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userBalanceProviders } from './user_balance.provider';
import { usersProviders } from 'src/users/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserBalanceController],
  providers: [UserBalanceService, ...userBalanceProviders, ...usersProviders],
})
export class UserBalanceModule {}
