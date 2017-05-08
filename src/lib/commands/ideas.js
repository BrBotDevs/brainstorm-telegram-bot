import { idea } from '../db';

export default {
    regex: /\/ideas/
    , name: '/ideas'
    , run: msg => new Promise((res, rej) => {
        idea.getForChat(msg.chat.id)
            .then(ideias => {
                const chat_name = msg.chat.title || 'esta conversa';
                if (ideias && ideias.length > 0) {
                    const _ideias = ideias.map(x => `#i${x.id}: ${x.text}; by user \`${x.userId}\``);
                    res({
                        text: `Ideias registradas para ${chat_name}:\n${_ideias.join('\n')}`
                        , options: {
                            parse_mode: 'Markdown'
                        }
                    });
                } else {
                    res({
                        text: `Não existem ideias registradas para ${chat_name}.`
                    });
                }
            })
            .catch(rej);
    })
};