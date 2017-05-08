import mongoose from 'mongoose';
import { info, log, error } from '../utils/log';
import idea from './entities/idea';

const buildConnString = (options = {}) => {
    const USER = options.USER || process.env.MONGO_USER;
    const PASS = options.PASSWORD || process.env.MONGO_PASSWORD;
    const HOST = options.HOST || process.env.MONGO_HOST;
    const PORT = options.PORT || process.env.MONGO_PORT;
    const DATABASE = options.DATABASE || process.env.MONGO_DATABASE;

    const _connString = ['mongodb://'];

    if (USER) _connString.push(PASS ? `${USER}:${PASS}@` : `${USER}@`);
    _connString.push(HOST || 'localhost');
    if (PORT) _connString.push(`:${PORT}`);
    if (DATABASE) _connString.push(`/${DATABASE}`);

    return _connString.join('');
};

const connect = () => {
    const connString = buildConnString();

    mongoose.Promise = global.Promise;

    mongoose.connect(connString);

    mongoose.connection.on('error', function (err) {
        error('Mongoose default connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
        log('Mongoose default connection disconnected');
    });
    mongoose.connection.on('open', function () {
        info('Mongoose default connection is open');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};

export default {
    connect
};

export { buildConnString, idea };