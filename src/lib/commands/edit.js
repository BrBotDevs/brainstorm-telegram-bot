import { idea } from '../db';

export default {
    regex: /\/edit #i(\d+) (.*)/i
    , name: '/edit'
    , help: 'Edit a ideia'
    , detailedHelp: 'Uso: `/edit #i[número da ideia] [novo texto]`'
    , run: (msg, match, utils) => new Promise((res, rej) => {
        const user_id = msg.from.id;
        const idea_id = match[1];
        const newText = match[2];

        utils.userUtils.hasPermission(utils.permissions.EDIT, user_id, idea_id)
            .then(result => {
                if (result) {
                    idea.select({ id: idea_id })
                        .then(i => {
                            i.status = utils.status.EDITED;
                            i.text = newText;
                            i.lastStatusChangeDate = new Date();
                            i.save()
                                .then(res({
                                    text: `Ideia #i${idea_id} alterada!`
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