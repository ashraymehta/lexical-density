import {ApplicationServer} from './bootstrap/application-server';

async function bootUp() {
    const application = new ApplicationServer().initialize();
    application.listen(15000);
}

bootUp();