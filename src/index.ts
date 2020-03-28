import {ApplicationServer} from './bootstrap/application-server';
import {DatabaseBootstrapper} from './bootstrap/database-bootstrapper';

async function bootUp() {
    const applicationServer = new ApplicationServer();
    const application = applicationServer.initialize();
    application.listen(15000);

    await applicationServer.container.get(DatabaseBootstrapper).bootstrap();
}

bootUp();