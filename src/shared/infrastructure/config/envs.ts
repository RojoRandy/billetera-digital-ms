import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  MONGODB_URI: string;
  NATS_SERVERS: string[];
}

const envsSchema = joi.object<EnvVars>({
  PORT: joi.number().required(),
  MONGODB_URI: joi.string().required(),
  NATS_SERVERS: joi.array().items(joi.string()).required(),
}).unknown(true)

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
})

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs: EnvVars = {
  PORT: envVars.PORT,
  MONGODB_URI: envVars.MONGODB_URI,
  NATS_SERVERS: envVars.NATS_SERVERS,
}
