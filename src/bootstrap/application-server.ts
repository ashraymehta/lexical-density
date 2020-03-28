import 'reflect-metadata';
import {Application} from 'express';
import {Container} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils';
import {ContainerBuilder} from './dependency-injection/container-builder';
import {ErrorHandlingMiddleware} from '../controllers/error-handling-middleware';

export class ApplicationServer {
    public readonly container: Container;

    constructor() {
        this.container = new ContainerBuilder().build();
    }

    public initialize(): Application {
        return new InversifyExpressServer(this.container)
            .setErrorConfig(app => app.use(ErrorHandlingMiddleware.handleError))
            .build();
    }
}