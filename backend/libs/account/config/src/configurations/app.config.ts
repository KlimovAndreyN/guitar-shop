import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { ConfigAlias, DEFAULT_PORT, DEFAULT_SMTP_PORT, Environment, ENVIRONMENTS } from '@backend/shared/core';
import { getPort } from '@backend/shared/helpers';

export interface ApplicationConfig {
  environment: string;
  port: number;
  frontendUrl: string;
  mailSmtp: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  }
}

const validationSchema =
  Joi.object({
    environment: Joi.string().valid(...ENVIRONMENTS).required().label(ConfigAlias.NodeEnv),
    port: Joi.number().port().default(DEFAULT_PORT),
    frontendUrl: Joi.string().required().label(ConfigAlias.FrontendUrlEnv),
    mailSmtp: Joi.object({
      host: Joi.string().valid().hostname().required().label(ConfigAlias.MailSmtpHostEnv),
      port: Joi.number().port().default(DEFAULT_SMTP_PORT),
      user: Joi.string().required().label(ConfigAlias.MailSmtpUserEnv),
      password: Joi.string().required().label(ConfigAlias.MailSmtpPasswordEnv),
      from: Joi.string().required().label(ConfigAlias.MailSmtpFromEnv)
    })
  });

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Account Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env[ConfigAlias.NodeEnv] as Environment,
    port: getPort(ConfigAlias.PortEnv, DEFAULT_PORT),
    frontendUrl: process.env[ConfigAlias.FrontendUrlEnv],
    mailSmtp: {
      host: process.env[ConfigAlias.MailSmtpHostEnv],
      port: getPort(ConfigAlias.MailSmtpPortEnv, DEFAULT_SMTP_PORT),
      user: process.env[ConfigAlias.MailSmtpUserEnv],
      password: process.env[ConfigAlias.MailSmtpPasswordEnv],
      from: process.env[ConfigAlias.MailSmtpFromEnv]
    }
  };

  validateConfig(config);

  return config;
}

export const applicationConfig = registerAs(ConfigAlias.Application, getConfig);
