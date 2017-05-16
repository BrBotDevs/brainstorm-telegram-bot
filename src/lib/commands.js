import fs from 'fs';
import { info, error } from './utils/log';
import pj from 'prettyjson';
import CommonUtils from './utils';

const commands = fs.readdirSync(`${__dirname}/commands`)
    .map(x => require(`${__dirname}/commands/${x}`).default);

const generateHelp = () =>
    commands.reduce((text, command) => {
        if (command.help) text = `${text}\n${command.name}: ${command.help}`;
        return text;
    }, '');

const sendErr = (bot, chat_id, command, err) => bot.sendMessage(chat_id, `Erro ao executar comando ${name}:\n\`${pj.render(err)}\``, { parse_mode: 'Markdown' });

const logErr = err => error(pj.render(err));

const setUpBot = bot => {
    const names = commands.map(command => {
        bot.onText(command.regex, (msg, match) => {
            const commonUtils = new CommonUtils(bot, msg);
            command.run(msg, match, commonUtils)
                .then(response => {
                    bot.sendMessage(msg.chat.id, response.text, response.options)
                        .catch(logErr);
                })
                .catch(err => {
                    sendErr(bot, msg.chat.id, command.name, err)
                        .catch(logErr);
                });
        });
        return command.name;
    });

    bot.onText(/\/help/, msg => {
        const privateChat = msg.chat.type == 'private';
        if (privateChat)
            bot.sendMessage(msg.chat.id, generateHelp())
                .catch(err => sendErr(bot, msg.chat.id, '/help', err)
                    .catch(logErr));
        else {
            bot.send;
        }
    });

    bot.onText(/.*/, msg => {
        bot.sendMessage(msg.chat.id, 'Desculpa, não entendi. Se precisar de ajuda, digite /help!')
            .catch(logErr);
    });

    info(`Comandos carregados: ${names.join(', ')}`);
};

export default {
    commands
    , setUpBot
};