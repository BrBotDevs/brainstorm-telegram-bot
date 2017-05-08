export default {
    regex: /\/del #i(\d+)/i
    , name: '/del'
    , run: (msg, match, utils) => new Promise((res, rej) => {
        const user_id = msg.from.id;
        const idea_id = match[1];

        utils.userUtils.hasPermission(utils.permissions.MODERATE, user_id, idea_id)
            .then(result => {
                if (result) {
                    res({
                        text: `Marcando ideia ${idea_id} como aprovada`
                    });
                } else {
                    res({
                        text: 'Você não tem permissão para aprovar a ideia.'
                    });
                }
            })
            .catch(rej);
    })
};