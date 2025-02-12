import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { applicationConfig } from '@backend/account/config';

import { REGISTER_USER_TEMPLATE, REGISTER_USER_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  @Inject(applicationConfig.KEY)
  private readonly applicationConfig: ConfigType<typeof applicationConfig>;

  constructor(
    private readonly mailerService: MailerService
  ) { }

  public async sendNotifyRegiteredUser(url: string, name: string, email: string, password: string): Promise<void> {
    const { mailSmtp: { from } } = this.applicationConfig;
    const sendMailOption: ISendMailOptions = {
      from,
      to: email,
      subject: REGISTER_USER_SUBJECT,
      template: REGISTER_USER_TEMPLATE,
      context: { url, name, login: email, password }
    };

    await this.mailerService.sendMail(sendMailOption);
  }
}
