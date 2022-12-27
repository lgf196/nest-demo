import * as dotenv from 'dotenv';
dotenv.config(); //在Injectable之外读取env文件变量
export const APP_ENV_DEV = process.env.APP_ENV_DEV;

export const APP_ENV_PROD = process.env.APP_ENV_PROD;
