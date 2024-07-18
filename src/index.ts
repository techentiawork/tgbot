<<<<<<< HEAD
import TelegramBot from "node-telegram-bot-api";
import { handleTelegramMessage } from "./telegram";
import { Redis } from "@upstash/redis";
import OpenAI from "openai";
import { config } from "dotenv";
import { generate } from "./openai";
import { redisMethods } from "./redis";
import { claude } from "./claude";
=======
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import { handleTelegramMessage } from './telegram';
import { Redis } from '@upstash/redis';
import OpenAI from 'openai';
import { config } from 'dotenv';
import { generate } from './openai';
import { redisMethods } from './redis';
import { claude } from './claude';
>>>>>>> 7476a56ea19dac6e5751c1c0d6b19a5a1f2777d3

config();
const telegramToken = process.env.TELEGRAM_BOT_TOKEN as string;
const apiKey = process.env.OPENAI_API_KEY as string;
const url = process.env.UPSTASH_URL as string;
const upstashToken = process.env.UPSTASH_TOKEN as string;
const port = process.env.PORT || 8000;

const openai = new OpenAI({ apiKey });
export const redis = new Redis({
  url,
  token: upstashToken,
});
const telegram = new TelegramBot(telegramToken, { polling: true });

telegram.on('message', (msg) =>
  handleTelegramMessage(openai, redis, telegram, msg, redisMethods, claude)
);

telegram.on('error', (err) => console.log(err.message));

// Set up an Express server to listen on the specified port
const app = express();
app.get('/', (req, res) => {
  res.send('Telegram bot is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
