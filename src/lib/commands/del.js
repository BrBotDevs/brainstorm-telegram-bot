import { idea } from '../db';

export default {
    regex: /\/del #i(\d+)/i
    , name: '/del'
    , help: 'Exclui a ideia'
    , detailedHelp: 'Uso: `/del #i[número da ideia]`'
    , run: (msg, match, utils) => new Promise((res, rej) => {
        const chat_id = msg.chat.id;
        const user_id = msg.from.id;
        const idea_id = match[1];

        utils.userUtils.hasPermission(utils.permissions.DELETE, user_id, idea_id)
            .then(result => {
                if (result) {
                    idea.delete({ chatId: chat_id, id: idea_id })
                        .then(() => {
                            res({
                                text: `Ideia #i${idea_id} apagada!`
                            });
                        })
                        .catch(rej);
                } else {
                    res({
                        text: 'Você não tem permissão para excluir a ideia.'
                    });
                }
            })
            .catch(rej);
    })
};