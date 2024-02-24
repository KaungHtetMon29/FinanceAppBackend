import { Module } from '@nestjs/common';
import { UserHistoryService } from './user_history.service';
import { UserHistoryController } from './user_history.controller';
import { userHistoryProviders } from './user_history.provider';
import { DatabaseModule } from 'src/database/database.module';
import { CacheConfigModule } from 'src/cache/cache.module';
import { userBalanceProviders } from 'src/user_balance/user_balance.provider';
import { usersProviders } from 'src/users/users.providers';

@Module({
  imports: [CacheConfigModule, DatabaseModule],
  controllers: [UserHistoryController],
  providers: [
    UserHistoryService,
    ...userHistoryProviders,
    ...userBalanceProviders,
    ...usersProviders,
  ],
})
export class UserHistoryModule {}
