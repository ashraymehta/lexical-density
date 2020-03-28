import {Server} from 'http';
import express = require('express');

export class ServerBootstrapper {
    private static readonly ServerPort = 15000;

    public async bootstrap(): Promise<Server> {
        const expressApplication = express();
        return expressApplication.listen(ServerBootstrapper.ServerPort);
    }
}