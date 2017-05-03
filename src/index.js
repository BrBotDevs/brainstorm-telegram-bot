require('dotenv-safe').load();
import TelegramBot from 'node-telegram-bot-api';
import { error, info } from './lib/utils/log';
import commands from './lib/commands'; //eslint-disable-line

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
    polling: true
});

bot
    .getMe()
    .then(me => {
        let _info = [];
        const date = new Date();
        _info.push('');
        _info.push('------------------------------');
        _info.push('Bot successfully deployed!');
        _info.push('------------------------------');
        _info.push('Bot info:');
        _info.push(`- ID: ${me.id}`);
        _info.push(`- Name: ${me.first_name}`);
        _info.push(`- Username: ${me.username}`);
        _info.push('');
        _info.push('Server info:');
        _info.push(`- Node version: ${process.version}`);
        _info.push('');
        _info.push('MongoDB info:');
        _info.push(
            `- Host: ${process.env.MONGO_HOST || 'localhost'}${process.env.MONGO_PORT
                ? `:${process.env.MONGO_PORT}`
                : ''}`
        );
        if (process.env.MONGO_USER) _info.push(`- User: ${`${process.env.MONGO_USER}`}`);
        _info.push(`- Database: ${process.env.MONGO_DATABASE}`);
        _info.push('');
        _info.push('Time Info:');
        _info.push(
            `- Date: ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        );
        _info.push(
            `- Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        );
        _info.push('------------------------------');
        info(_info.join('\n'));
        commands.setUpBot(bot);
    })
    .catch(error);