import { Injectable, Logger } from '@nestjs/common';

import { XHeader } from '@backend/shared/core';
import { MailService } from '@backend/notify/mail';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService
  ) { }

  public async addSubscriber(subscriber: CreateSubscriberDto, requestId: string): Promise<void> {
    Logger.log(`AddSubscriber: ${XHeader.RequestId}: ${requestId || 'empty'}`, EmailSubscriberService.name);

    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      Logger.log('AddSubscriber: subscriber exists', EmailSubscriberService.name);

      return;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);

    await this.emailSubscriberRepository.save(emailSubscriber);
    Logger.log(`AddSubscriber: new subscriber ${email} saved`, EmailSubscriberService.name);

    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
