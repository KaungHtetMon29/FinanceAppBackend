import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private readonly mailerService: MailerService) {}

  private readonly logger = new Logger(TaskService.name);

  // @Cron('1 * * * * *')
  // async sendEmail() {
  //   console.log('send email');
  //   await this.mailerService.sendMail({
  //     to: 'k315773@gmail.com',
  //     subject: 'Testing Nest MailerModule ✔',
  //     text: 'welcome to finance app',
  //   });
  // }
  // handleCron() {
  //   this.logger.debug('Called when the current second is 1');
  // }
  @Interval(1000)
  async sendEmail() {
    console.log('send email');
    await this.mailerService.sendMail({
      to: 'k315773@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome to finance app',
    });
  }
}
