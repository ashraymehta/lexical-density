import 'reflect-metadata';
import {Application} from 'express';
import {connectLogger} from 'log4js';
import {Logger} from '../utils/logger';
import {Container, interfaces} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils';
import {ContainerBuilder} from './dependency-injection/container-builder';
import {ErrorHandlingMiddleware} from '../controllers/error-handling-middleware';
import Middleware = interfaces.Middleware;

export class ApplicationServer {
    public readonly container: Container;

    constructor() {
        this.container = new ContainerBuilder().build();
    }

    public initialize(): Application {
        return new InversifyExpressServer(this.container)
            .setConfig(app => app.use(this.loggerMiddleware()))
            .setErrorConfig(app => app.use(ErrorHandlingMiddleware.handleError))
            .build();
    }

    private loggerMiddleware(): Middleware {
        return connectLogger(Logger.getLogger('express'), {
            level: 'auto', statusRules: [
                {from: 100, to: 499, level: 'info'},
                {from: 500, to: 599, level: 'error'},
            ]
        });
    }
}