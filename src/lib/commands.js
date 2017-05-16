import fs from 'fs';
import { info, error } from './utils/log';
import pj from 'prettyjson';
import CommonUtils from './utils';

const commands = fs.readdirSync(`${__dirname}/commands`)
    .map(x => require(`${__dirname}/commands/${x}`).default)
    .filter(x => x && x.regex);

const generateHelp = () =>
    commands.reduce((text, command) => {
        text = `${text}\n${command.name}${command.help ? `: ${command.help}` : ''}`;
        return text;
    }, 'Utilize `/help [nome do comando]` para ajuda avançada\n');

const sendErr = (bot, chat_id, name, err) => bot.sendMessage(chat_id, `Erro ao executar comando ${name}:\n\`${pj.render(err)}\``, { parse_mode: 'Markdown' });

const logErr = err => error(pj.render(err));

const checkName = (name, compare) => name.replace(/#|\//i, '') == compare.replace(/#|\//i, '');

const getDetailedHelp = (commandName) => commands.filter(x => checkName(x.name, commandName))
    .reduce((val, command) => command.detailedHelp, 'Ajuda avançada não disponível');

const setUpBot = bot => {
    const names = commands.map(command => {
        bot.onText(command.regex, (msg, match) => {
            const commonUtils = new CommonUtils(bot, msg);
            command.run(msg, match, commonUtils)
                .then(response => {
                    bot.sendMessage(msg.chat.id, response.text, response.options)
                        .catch(logErr);
                })
                .catch(err => sendErr(bot, msg.chat.id, command.name, err))
                .catch(logErr);
        });
        return command.name;
    });

    bot.onText(/\/help ?(?:\/|#)?(.*)/, (msg, match) => {
        const privateChat = msg.chat.type == 'private';
        const text = match[1] ? getDetailedHelp(match[1]) : generateHelp();
        if (privateChat)
            bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' })
                .catch(err => sendErr(bot, msg.chat.id, '/help', err))
                .catch(logErr);
        else {
            bot.sendMessage(msg.from.id, text, { parse_mode: 'Markdow' })
                .then(() => {
                    bot.sendMessage(msg.chat.id, 'Te chamei no privado :D', {
                      reply_to_message_id: msg.chat.id
                    })
                    .catch(logErr);
                })
                .catch(() => {
                    bot.sendMessage(msg.chat.id, 'Me chame no privado primeiro!', { parse_mode: 'Markdown' })
                        .catch(err => sendErr(bot, msg.chat.id, '/help', err))
                        .catch(logErr);
                });
        }
    });

//    bot.onText(/.*/, msg => {
//        bot.sendMessage(msg.chat.id, 'Desculpa, não entendi. Se precisar de ajuda, digite /help!')
//            .catch(logErr);
//    });

    info(`Comandos carregados: ${names.join(', ')}`);
};

export default {
    commands
    , setUpBot
};
