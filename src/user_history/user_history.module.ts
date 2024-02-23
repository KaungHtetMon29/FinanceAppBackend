import { Module } from '@nestjs/common';
import { UserHistoryService } from './user_history.service';
import { UserHistoryController } from './user_history.controller';
import { userHistoryProviders } from './user_history.provider';
import { DatabaseModule } from 'src/database/database.module';
import { CacheConfigModule } from 'src/cache/cache.module';

@Module({
  imports: [CacheConfigModule, DatabaseModule],
  controllers: [UserHistoryController],
  providers: [UserHistoryService, ...userHistoryProviders],
})
export class UserHistoryModule {}
