import { idea } from '../db';
import pj from 'prettyjson';

export default {
    regex: /.*#brainstorm.*/
    , name: '#brainstorm'
    , run: (msg, match, utils) => new Promise((res, rej) => {
        idea.insert({
            id: msg.message_id
            , userId: msg.from.id
            , chatId: msg.chat.id
            , text: msg.text.replace('#brainstorm', '').trim()
            , status: utils.status.SUBMITED
            , lastStatusChangeDate: new Date()
        }).then(saved => {
            res({
                text: `Ideia #i${saved.id} salva com sucesso!`
                , options: {
                    reply_to_message_id: msg.message_id
                }
            });
        }).catch(err => {
            rej({
                text: `Erro ao salvar a ideia #${msg.message_id}: \`${pj.render(err)}\``
                , options: {
                    reply_to_message_id: msg.message_id
                    , parse_mode: 'Markdown'
                }
            });
        });
    })
};