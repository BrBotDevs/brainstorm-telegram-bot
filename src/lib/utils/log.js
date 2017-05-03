/* eslint-disable no-console */
import chalk from 'chalk';

const write = (level, msg) => {
    let color = '';
    switch (level) {
    case 'error':
        color = 'red';
        break;
    case 'warn':
        color = 'yellow';
        break;
    case 'info':
        color = 'cyan';
        break;
    case 'log':
        color = 'blue';
        break;
    }
    console[level](chalk[color](msg));
};

const log = msg => write('log', msg);

const error = msg => write('error', msg);

const warn = msg => write('warn', msg);

const info = msg => write('info', msg);

export {
    log
    , error
    , warn
    , info
};