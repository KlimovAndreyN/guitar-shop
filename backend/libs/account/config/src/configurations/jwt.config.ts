import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { ConfigAlias } from '@backend/shared/core';

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
}

const validationSchema = Joi.object({
  accessTokenSecret: Joi.string().required().label(ConfigAlias.JwtAccessTokenSecretEnv),
  accessTokenExpiresIn: Joi.string().required().label(ConfigAlias.JwtAccessTokenExpiresInEnv)
});

function validateConfig(config: JWTConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Account JWTConfig Validation Error]: ${error.message}`);
  }
}

function getConfig(): JWTConfig {
  const config: JWTConfig = {
    accessTokenSecret: process.env[ConfigAlias.JwtAccessTokenSecretEnv],
    accessTokenExpiresIn: process.env[ConfigAlias.JwtAccessTokenExpiresInEnv]
  };

  validateConfig(config);

  return config;
}

export const jwtConfig = registerAs(ConfigAlias.AppJwt, getConfig);
