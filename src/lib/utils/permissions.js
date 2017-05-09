export default class Permissions {
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