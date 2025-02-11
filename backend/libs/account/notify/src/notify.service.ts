import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { rabbitConfig } from '@backend/account/config';
import { CreateSubscriberDto } from '@backend/notify/email-subsriber';

@Injectable()
export class NotifyService {
  @Inject(rabbitConfig.KEY)
  private readonly rabbitOptions: ConfigType<typeof rabbitConfig>;

  constructor(
    private readonly rabbitClient: AmqpConnection
  ) { }

  public async registerSubscriber(dto: CreateSubscriberDto, requestId: string) {
    const result = await this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscriber,
      dto,
      makeHeaders(requestId)
    );

    return result;
  }
}
