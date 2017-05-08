import UserUtils, { Permissions } from './user';

export default class CommonUtils {
    constructor(bot, chat_id) {
        this._bot = bot;
        this._chat_id = chat_id;
        this._userUtils = new UserUtils(bot, chat_id);
        this._permissions = Permissions;
    }

    get userUtils() {
        return this._userUtils;
    }

    get permissions() {
        return this._permissions;
    }

}