require('dotenv-safe').load();
import TelegramBot from 'node-telegram-bot-api';
import { idea } from './lib/db';
import pj from 'prettyjson';

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
    polling: true
});

bot.onText(/.*#brainstorm.*/, msg => {
    idea.insert({
        id: msg.message_id
        , userId: msg.from.id
        , chatId: msg.chat.id
        , text: msg.text
        , status: 'Submited'
        , lastStatusChangeDate: new Date()
    }).then(saved => {
        bot.sendMessage(msg.chat.id, `Ideia #${saved.id} salva com sucesso!`, {
            reply_to_message_id: msg.message_id
        });
    }).catch(err => {
        bot.sendMessage(msg.chat.id, `Erro ao salvar a ideia #${msg.message_id}: \`${pj.render(err)}\``, {
            parse_mode: 'Markdown'
            , reply_to_message_id: msg.message_id
        });
    });
});