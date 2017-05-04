import { idea } from '../db';

export default {
    regex: /\/del #i(\d+)/i
    , name: '/del'
    , run: (msg, match) => new Promise((res, rej) => {
        idea.delete({ chatId: msg.chat.id, id: match[1] })
            .then(() => {
                res({
                    text: `Ideia #i${match[1]} apagada!`
                });
            })
            .catch(rej);
    })
};