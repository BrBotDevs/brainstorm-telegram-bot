import { idea } from '../db';

export class Permissions {
    static UPDATE(user_id, idea_id, userUtils) {
        return new Promise((res, rej) => {
            userUtils.isCreatorOf(userUtils.chat_id, user_id, idea_id)
                .then(res)
                .catch(rej);
        });
    }

    static DELETE(user_id, idea_id, userUtils) {
        return new Promise((res, rej) => {
            userUtils.isCreatorOf(userUtils.chat_id, user_id, idea_id)
                .then(result => {
                    if (result)
                        userUtils.isAdmin(userUtils.chat_id, user_id)
                            .then(result => res(result))
                            .catch(rej);
                    else
                        res(false);
                })
                .catch(rej);
        });
    }

    static MODERATE(user_id, idea_id, userUtils) {
        return userUtils.isAdmin(userUtils.chat_id, user_id);
    }

    static VOTE() {
        return 2;
    }
}

export default class UserUtils {

    constructor(bot, chat_id) {
        this._bot = bot;
        this._chat_id = chat_id;
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