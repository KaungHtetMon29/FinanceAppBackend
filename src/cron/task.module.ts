import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { usersProviders } from 'src/users/users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TaskService, ...usersProviders],
})
export class TaskModule {}
