import { idea } from '../db';

export default {
    regex: /\/ideas/
    , name: '/ideas'
    , run: msg => new Promise((res, rej) => {
        idea.getForChat(msg.chat.id)
            .then(ideias => {
                if (ideias && ideias.length > 0) {
                    const _ideias = ideias.map(x => `#i${x.id}: ${x.text}; by user \`${x.userId}\``);
                    res({
                        text: `Ideias registradas para ${msg.chat.title}:\n${_ideias.join('\n')}`
                        , options: {
                            parse_mode: 'Markdown'
                        }
                    });
                } else {
                    res({
                        text: `Não existem ideias registradas para ${msg.chat.title}.`
                    });
                }
            })
            .catch(rej);
    })
};