import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

// Criação do Schema
const jsonSchema = {
    id: Number
    , name: String
    , last_name: String
    , username: String
};

const userSchema = new Schema(jsonSchema);

const User = mongoose.model('User', userSchema, 'users');

const Controller = {
    insert: d => new Promise((res, rej) =>
        new User(d).save((err, data) => {
            if (err) rej(err);
            else res(data);
        })
    )
    , select: q => new Promise((res, rej) => {
        User.findOne(q, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    })
    , delete: q => new Promise((res, rej) => {
        User.findOneAndRemove(q, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    })
    , getAll: () => new Promise((res, rej) => {
        User.find({})
            .then(res)
            .catch(rej);
    })
    , getForChat: (chatId) => new Promise((res, rej) => {
        User.find({ chatId }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    })
};

module.exports = Controller;