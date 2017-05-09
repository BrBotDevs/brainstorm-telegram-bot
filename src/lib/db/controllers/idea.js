import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

// Criação do Schema
const jsonSchema = {
    id: Number
    , userId: Number
    , chatId: Number
    , text: String
    , dateRegistered: { type: Date, default: Date.now }
    , status: Number
    , lastStatusChangeDate: Date
};

const ideaSchema = new Schema(jsonSchema);

const Idea = mongoose.model('Idea', ideaSchema, 'ideas');

const Controller = {
    insert: d => new Promise((res, rej) =>
        new Idea(d).save((err, data) => {
            if (err) rej(err);
            else res(data);
        })
    )
    , select: q => new Promise((res, rej) => {
        Idea.findOne(q, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    })
    , delete: q => new Promise((res, rej) => {
        Idea.findOneAndRemove(q, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    })
    , getAll: () => new Promise((res, rej) => {
        Idea.find({})
            .then(res)
            .catch(rej);
    })
    , getForChat: (chatId) => new Promise((res, rej) => {
        Idea.find({ chatId }, (err, data) => {
            if (err) rej(err);
            else res(data);
        });
    })
};

module.exports = Controller;