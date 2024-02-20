import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron('10 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 1');
  }
  @Interval(1000)
  handleInterval() {
    this.logger.debug('Called every second');
  }
}
