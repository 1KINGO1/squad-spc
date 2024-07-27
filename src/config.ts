import * as process from "node:process";

const dotenv = require('dotenv');
dotenv.config({path: `.env.${process.env.NODE_ENV || 'development'}`});

export default {
  PORT: +process.env.PORT,
  HOST: process.env.HOST.startsWith("http") ? process.env.HOST : `http://${process.env.HOST}`,
  STEAM_API_KEY: process.env.STEAM_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
  API_PREFIX: process.env.API_PREFIX || '/api',

  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: +process.env.DB_PORT || 5050,
  DB_USERNAME: process.env.DB_USERNAME || 'admin',
  DB_PASSWORD: process.env.DB_PASSWORD || 'admin',
  DB_NAME: process.env.DB_NAME || 'spc'
}