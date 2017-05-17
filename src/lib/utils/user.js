import { user, idea } from '../db';

export default class UserUtils {

    constructor(bot, msg, dbEntity) {
        this._bot = bot;
        this._chat_id = msg.chat.id;
        this._msg = msg;
        this._db_entity = dbEntity;
    }

    get bot() {
        return this._bot;
    }

    get chat_id() {
        return this._chat_id;
    }

    get id() {
        return this._db_entity.id;
    }

    get name() {
        return this._db_entity.name;
    }

    get last_name() {
        return this._db_entity.last_name;
    }

    get username() {
        return this._db_entity.username;
    }

    get readableId() {
        return self.generateReadableId(this._db_entity);
    }

    getReadableId(user_id) {
        return new Promise((res, rej) => {
            user.select({
                id: user_id
            })
                .then(user => {
                    if (user) res(self.generateReadableId(user));
                    else res(`User ${user_id}`);
                })
                .catch(rej);
        });
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

    static generateReadableId(entity) {
        return entity.username
            || `${entity.name}${entity.last_name ? ` ${entity.last_name}` : ''}`;
    }

    static getInstance(bot, msg) {
        return new Promise((res, rej) => {
            user.select({ id: msg.from.id })
                .then(_user => {
                    if (_user)
                        res(new UserUtils(bot, msg, _user));
                    else
                        user.insert({
                            id: msg.from.id
                            , name: msg.from.first_name
                            , last_name: msg.from.last_name
                            , username: msg.from.username
                        })
                            .then(entity => {
                                res(new UserUtils(bot, msg, entity));
                            })
                            .catch(rej);
                })
                .catch(rej);
        });
    }

}