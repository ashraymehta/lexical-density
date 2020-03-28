import {Server} from 'net';
import {expect} from 'chai';
import {OK} from 'http-status-codes';
import {mongoose} from '@typegoose/typegoose';
import {ApplicationServer} from '../../src/bootstrap/application-server';
import {DatabaseBootstrapper} from '../../src/bootstrap/database-bootstrapper';
import {Application} from 'express';
import supertest = require('supertest');

describe('Text Complexity Controller API', function () {
    let server: Server;
    before(async () => {
        const applicationServer = new ApplicationServer();
        const application = applicationServer.initialize();
        await startServer(application);
        await applicationServer.container.get(DatabaseBootstrapper).bootstrap();
    });

    it('should expose API to compute complexity', async function () {
        const response = await supertest(server)
            .get('/complexity/?text=Kim loves going to the cinema')
            .expect(OK);

        const responseBody = response.body;
        expect(responseBody.data.overall_ld).to.equal(0.67);
        expect(responseBody.data.sentence_ld).to.not.exist;
    });

    it('should expose API to compute complexity in verbose mode', async function () {
        const response = await supertest(server)
            .get('/complexity/?mode=verbose&text=Kim loves going to the cinema. John also likes to visit the cinema.')
            .expect(OK);

        const responseBody = response.body;
        expect(responseBody.data.overall_ld).to.equal(0.69);
        expect(responseBody.data.sentence_ld).to.deep.equal([0.67, 0.71]);
    });

    after(async () => {
        await closeServer();
        await mongoose.disconnect();
    });

    const startServer = (application: Application) => new Promise((resolve, reject) => {
        server = application.listen((err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });

    const closeServer = () => new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
});