import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Subscriber } from '@backend/shared/core';
import { applicationConfig } from '@backend/account/config';

import { ADD_SUBCRIBER_TEMPLATE, ADD_SUBSCRIBER_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  @Inject(applicationConfig.KEY)
  private readonly applicationConfig: ConfigType<typeof applicationConfig>;

  constructor(
    private readonly mailerService: MailerService
  ) { }

  public async sendNotifyNewSubscriber(subscriber: Subscriber): Promise<void> {
    const { name, email } = subscriber;
    const { mailSmtp: { from } } = this.applicationConfig;
    const sendMailOption: ISendMailOptions = {
      from,
      to: email,
      subject: ADD_SUBSCRIBER_SUBJECT,
      template: ADD_SUBCRIBER_TEMPLATE,
      context: { name, email }
    };

    await this.mailerService.sendMail(sendMailOption);
  }
}
