import * as dotenv from 'dotenv';
dotenv.config();

enum ENVIRONMENT_VARIABLES {
  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_USER = 'DATABASE_USER',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_NAME = 'DATABASE_NAME',
  DATABASE_PORT = 'DATABASE_PORT',
  GEMINI_KEY = 'GEMINI_KEY',
  JWT_SECRET = 'JWT_SECRET',
}

function getEnv(variableName: ENVIRONMENT_VARIABLES) {
  // const envKey = ENVIRONMENT_VARIABLES[variableName];
  const foundEnv = process.env[variableName];
  // const message = `${envKey} was not found!`;
  if (!foundEnv) {
    // console.log(message);
    throw Error(`${variableName} was not found!`);
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
  geminiKey: getEnv(ENVIRONMENT_VARIABLES.GEMINI_KEY),
  jwtSecret: getEnv(ENVIRONMENT_VARIABLES.JWT_SECRET),
};
