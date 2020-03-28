import {Server} from 'net';
import {expect} from 'chai';
import {OK} from 'http-status-codes';
import {ApplicationServer} from '../../src/bootstrap/application-server';
import supertest = require('supertest');

describe('Text Complexity Controller API', function () {
    let server: Server;
    before((done) => {
        const application = new ApplicationServer().initialize();
        server = application.listen((err) => done(err));
    });

    it('should expose API to compute complexity', async function () {
        const response = await supertest(server)
            .get('/complexity/?text=Kim loves going to the cinema')
            .expect(OK);

        const responseBody = response.body;
        expect(responseBody.data.overall_ld).to.equal(0.67);
        expect(responseBody.data.sentence_ld).to.not.exist;
    });

    after(done => {
        server.close((err) => done(err));
    });
});