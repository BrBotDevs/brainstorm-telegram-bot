import { idea } from '../db';

export default {
    regex: /\/approve #i(\d+)/i
    , name: '/approve'
    , run: (msg, match, utils) => new Promise((res, rej) => {
        const user_id = msg.from.id;
        const idea_id = match[1];

        utils.userUtils.hasPermission(utils.permissions.MODERATE, user_id, idea_id)
            .then(result => {
                if (result) {
                    idea.select({ ìd: idea_id })
                        .then(i => {
                            i.status = utils.status.APPROVED;
                            i.lastStatusChangeDate = new Date();
                            i.save()
                                .then(res({
                                    text: `Ideia #i${idea_id} aprovada!`
                                }))
                                .catch(rej);
                        })
                        .catch(rej);
                } else {
                    res({
                        text: 'Você não tem permissão para aprovar a ideia.'
                    });
                }
            })
            .catch(rej);
    })
};