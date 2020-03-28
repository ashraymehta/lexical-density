import 'reflect-metadata';
import {Application} from 'express';
import {InversifyExpressServer} from 'inversify-express-utils';
import {ContainerBuilder} from './dependency-injection/container-builder';

export class ApplicationServer {
    public initialize(): Application {
        const container = new ContainerBuilder().build();
        return new InversifyExpressServer(container).build();
    }
}