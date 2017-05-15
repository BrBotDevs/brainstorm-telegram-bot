import { idea } from '../db';

export default class UserUtils {

    constructor(bot, msg) {
        this._bot = bot;
        this._chat_id = msg.chat.id;
        this._msg = msg;
    }

    get bot() {
        return this._bot;
    }

    get chat_id() {
        return this._chat_id;
    }

    getAdmins() {
        return new Promise((res, rej) => {
            this.bot.getChatAdministrators(this.chat_id)
                .then(res)
                .catch(rej);
        });
    }

    getAdminIds() {
        return new Promise((res, rej) => {
            this.getAdmins()
                .then(admins => res(admins.map(x => x.user.id)))
                .catch(rej);
        });
    }

    isAdmin(user_id) {
        return new Promise((res, rej) => {
            if (this._msg.chat.type == 'private') res(true);
            else
                this.getAdminIds()
                    .then(ids => res(ids.includes(user_id)))
                    .catch(rej);
        });
    }

    isCreatorOf(user_id, idea_id) {
        return new Promise((res, rej) => {
            idea.select({
                id: idea_id
                , chatId: this.chat_id
            })
                .then(idea => {
                    if (idea)
                        res(idea.userId == user_id);
                    else
                        rej(`Ideia #i${idea_id} não encontrada.`);
                })
                .catch(rej);
        });
    }

    /**
     * @returns {Promise}
     */
    hasPermission(permission, user_id, idea_id) {
        return permission(user_id, idea_id, this);
    }
}