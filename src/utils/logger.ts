import {configure, getLogger, Logger as log4jsLogger} from 'log4js';

export class Logger {
    public static getLogger(name: string): log4jsLogger {
        return getLogger(name);
    }

    public static initialize() {
        configure({
            appenders: {
                out: {
                    type: 'stdout',
                    layout: {
                        type: 'pattern',
                        pattern: '[%d] [%p] [%z] [%c] - %m',
                    },
                },
            },
            categories: {default: {appenders: ['out'], level: 'info'}},
        });
    }
}

Logger.initialize();