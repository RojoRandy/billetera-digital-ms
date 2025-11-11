import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  MONGODB_URI: string;
}

const envsSchema = joi.object<EnvVars>({
  PORT: joi.number().required(),
  MONGODB_URI: joi.string().required(),
}).unknown(true)

const { error, value } = envsSchema.validate({
  ...process.env
})

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs: EnvVars = {
  PORT: envVars.PORT,
  MONGODB_URI: envVars.MONGODB_URI,
}
