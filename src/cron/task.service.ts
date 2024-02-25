import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/users.interface';

@Injectable()
export class TaskService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  private readonly logger = new Logger(TaskService.name);

  @Cron('0 0 26 * *')
  async sendEmail() {
    const emails = await this.userModel.find({}).select('email');
    console.log('send email');
    console.log(emails);
    const emailPromises = emails.map((e) => {
      console.log(e.email);
      if (e.email) {
        return this.mailerService.sendMail({
          to: `${e.email}`,
          subject: 'Testing Nest MailerModule ✔',
          text: 'welcome to finance app',
        });
      }
    });
    await Promise.all(emailPromises);
  }
  // handleCron() {
  //   this.logger.debug('Called when the current second is 1');
  // }
  // @Interval(1000)
  // async sendEmail() {
  //   console.log('send email');
  //   await this.mailerService.sendMail({
  //     to: 'k315773@gmail.com',
  //     subject: 'Testing Nest MailerModule ✔',
  //     text: 'welcome to finance app',
  //   });
  // }
}
