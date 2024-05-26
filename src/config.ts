const dotenv = require('dotenv');
dotenv.config({path: `.env.${process.env.NODE_ENV}`});

export default {
  PORT: +process.env.PORT,
  HOST: process.env.HOST,
  STEAM_API_KEY: process.env.STEAM_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
  API_PREFIX: process.env.API_PREFIX || '/api',
}