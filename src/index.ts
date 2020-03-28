import 'reflect-metadata';
import {AddressInfo} from 'net';
import {Logger} from './utils/logger';
import {ApplicationServer} from './bootstrap/application-server';
import {DatabaseBootstrapper} from './bootstrap/database-bootstrapper';

async function bootUp() {
    const applicationServer = new ApplicationServer();
    const application = applicationServer.initialize();
    const server = application.listen(15000, () => {
        const {port} = server.address() as AddressInfo;
        Logger.getLogger('express').info(`Listening on port [${port}].`);
    });

    await applicationServer.container.get(DatabaseBootstrapper).bootstrap();
}

bootUp();