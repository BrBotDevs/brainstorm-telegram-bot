import UserUtils from './user';
import Permissions from './permissions';
import Status from './status';
import * as Db from '../db';

export default class CommonUtils {
    constructor(bot, msg) {
        this._bot = bot;
        this._chat_id = msg.chat.id;
        this._permissions = Permissions;
        this._status = Status;
        this._db = Db;
        this._chattype = msg.chat.type;
    }

    get user() {
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

    get chatType() {
        return this._chattype;
    }

    get msg() {
        return this._msg;
    }

    static getInstance(bot, msg) {
        return new Promise((res, rej) => {
            const commonUtils = new CommonUtils(bot, msg);
            UserUtils.getInstance(bot, msg)
                .then(userUtils => {
                    commonUtils._userUtils = userUtils;
                    res(commonUtils);
                })
                .catch(rej);
        });
    }
}