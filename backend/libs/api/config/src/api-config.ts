import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { ConfigAlias, DEFAULT_PORT, Environment, ENVIRONMENTS } from '@backend/shared/core';
import { getPort } from '@backend/shared/helpers';

export interface ApiConfig {
  environment: string;
  port: number;
  accountServiceUrl: string;
  blogPostServiceUrl: string;
  fileStorageServiceUrl: string;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required().label(ConfigAlias.NodeEnv),
  port: Joi.number().port().default(DEFAULT_PORT),
  accountServiceUrl: Joi.string().required().label(ConfigAlias.AccountServiceUrlEnv),
  blogPostServiceUrl: Joi.string().required().label(ConfigAlias.CatalogServiceUrlEnv),
  fileStorageServiceUrl: Joi.string().required().label(ConfigAlias.FileStorageServiceUrlEnv)
});

function validateConfig(config: ApiConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Api Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApiConfig {
  const config: ApiConfig = {
    environment: process.env[ConfigAlias.NodeEnv] as Environment,
    port: getPort(ConfigAlias.PortEnv, DEFAULT_PORT),
    accountServiceUrl: process.env[ConfigAlias.AccountServiceUrlEnv],
    blogPostServiceUrl: process.env[ConfigAlias.CatalogServiceUrlEnv],
    fileStorageServiceUrl: process.env[ConfigAlias.FileStorageServiceUrlEnv]
  };

  validateConfig(config);

  return config;
}

export const apiConfig = registerAs(ConfigAlias.Application, getConfig);
