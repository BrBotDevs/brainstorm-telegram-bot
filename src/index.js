import TelegramBot from 'node-telegram-bot-api';
import Idea from './lib/db';
import * as dotenv from 'dotenv-safe';

dotenv.load();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
    polling: true
});

bot.onText(/.*#brainstorm.*/, msg => {

});