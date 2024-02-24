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
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  // TaskModule
  imports: [
    // TaskModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'kaunghtetmon467@gmail.com',
          pass: 'maha vnpd ujmq vbqd',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@yourdomain.com>',
      },
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new EjsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
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
