import UserUtils from './user';
import Permissions from './permissions';
import Status from './status';
import * as Db from '../db';

export default class CommonUtils {
    constructor(bot, chat_id) {
        this._bot = bot;
        this._chat_id = chat_id;
        this._userUtils = new UserUtils(bot, chat_id);
        this._permissions = Permissions;
        this._status = Status;
        this._db = Db;
    }

    get userUtils() {
        return this._userUtils;
    }

    get permissions() {
        return this._permissions;
    }

    get status() {
        return this._status;
    }

    get db() {
        return this._db;
    }

}