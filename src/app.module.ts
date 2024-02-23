import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './database/database.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TaskModule } from './cron/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtGuardGuard } from './jwt-guard/jwt-guard.guard';
import { JwtService } from '@nestjs/jwt';
import { RolebaseGuard } from './rolebase/rolebase.guard';
import { UserBalanceModule } from './user_balance/user_balance.module';
import { UserHistoryModule } from './user_history/user_history.module';

@Module({
  // TaskModule
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    UserBalanceModule,
    UserHistoryModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtGuardGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolebaseGuard,
    },
  ],
  // controllers: [AppController],
})
export class AppModule {}
