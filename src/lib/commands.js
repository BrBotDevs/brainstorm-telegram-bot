import fs from 'fs';
import { info, error } from './utils/log';
import pj from 'prettyjson';
import CommonUtils from './utils';

const commands = fs.readdirSync(`${__dirname}/commands`)
    .map(x => require(`${__dirname}/commands/${x}`).default);

const setUpBot = bot => {
    const names = commands.map(command => {
        bot.onText(command.regex, (msg, match) => {
            const commonUtils = new CommonUtils(bot, msg);
            command.run(msg, match, commonUtils)
                .then(response => {
                    bot.sendMessage(msg.chat.id, response.text, response.options)
                        .catch(err => error(pj.render(err)));
                })
                .catch(err => {
                    bot.sendMessage(msg.chat.id, `Erro ao executar comando ${command.name}:\n\`${pj.render(err)}\``, {
                        parse_mode: 'Markdown'
                    })
                        .catch(err => error(pj.render(err)));
                });
        });
        return command.name;
    });
    info(`Comandos carregados: ${names.join(', ')}`);
};

export default {
    commands
    , setUpBot
};