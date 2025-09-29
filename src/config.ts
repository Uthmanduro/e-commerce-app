import * as dotenv from 'dotenv';
dotenv.config();

enum ENVIRONMENT_VARIABLES {
  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_USER = 'DATABASE_USER',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_NAME = 'DATABASE_NAME',
  DATABASE_PORT = 'DATABASE_PORT',
}

function getEnv(variableName: ENVIRONMENT_VARIABLES) {
  const envKey = ENVIRONMENT_VARIABLES[variableName];
  const foundEnv = process.env[envKey];
  const message = `${envKey} was not found!`;
  if (!foundEnv) {
    console.log(message);
    throw Error(message);
  }
  return foundEnv;
}

export const APP_CONFIGS = {
  database: {
    host: getEnv(ENVIRONMENT_VARIABLES.DATABASE_HOST),
    user: getEnv(ENVIRONMENT_VARIABLES.DATABASE_USER),
    password: getEnv(ENVIRONMENT_VARIABLES.DATABASE_PASSWORD),
    name: getEnv(ENVIRONMENT_VARIABLES.DATABASE_NAME),
    port: parseInt(getEnv(ENVIRONMENT_VARIABLES.DATABASE_PORT), 10),
  },
};
