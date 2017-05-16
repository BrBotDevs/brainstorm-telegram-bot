const buildText = (idea, utils) => {
    const text = [];
    text.push(`Ideia #i${idea.id}:`);
    text.push(`*Texto*: \`${idea.text}\``);
    text.push(`*Autor*: User \`${idea.userId}\´`);
    text.push(`*Status*: ${utils.status.getText(idea.status)}`);
    return text.join('\n');
};

export default {
    regex: /\/info #i(\d+)/i
    , name: '/info'
    , help: 'Mostra informações detalhadas sobre a ideia'
    , detailedHelp: 'Uso: `/info #i[número da ideia]`'
    , run: (msg, match, utils) => new Promise((res, rej) => {
        const chat_id = msg.chat.id;
        const user_id = msg.from.id;
        const idea_id = match[1];

        utils.db.idea.select({ id: idea_id, chatId: chat_id, userId: user_id })
            .then(i => {
                res({
                    text: buildText(i, utils)
                    , options: {
                        parse_mode: 'Markdown'
                        , reply_to_message_id: msg.message_id
                    }
                });
            })
            .chat(rej);
    })
};