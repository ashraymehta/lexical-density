import {Server} from 'net';
import {BAD_REQUEST} from 'http-status-codes';
import {ApplicationServer} from '../../src/bootstrap/application-server';
import supertest = require('supertest');

describe('Text Complexity Controller API', function () {
    let server: Server;
    before((done) => {
        const application = new ApplicationServer().initialize();
        server = application.listen((err) => done(err));
    });

    it('should return 400 response code if text is greater than 1000 characters', async function () {
        const text = `In show dull give need so held. One order all scale sense her gay style wrote. Incommode our not one ourselves residence. Shall there whose those stand she end. So unaffected partiality indulgence dispatched to of celebrated remarkably. Unfeeling are had allowance own perceived abilities. He my polite be object oh change. Consider no mr am overcame yourself throwing sociable children. Hastily her totally conduct may. My solid by stuff first smile fanny. Humoured how advanced mrs elegance sir who. Home sons when them dine do want to. Estimating themselves unsatiable imprudence an he at an. Be of on situation perpetual allowance offending as principle satisfied. Improved carriage securing are desirous too. Put all speaking her delicate recurred possible. Set indulgence inquietude discretion insensible bed why announcing. Middleton fat two satisfied additions. So continued he or commanded household smallness delivered. Door poor on do walk in half. Roof his head the what. Quick six blind smart out burst.`;
        await supertest(server)
            .get(`/complexity/?text=${text}`)
            .expect(BAD_REQUEST);
    });

    after(done => {
        server.close((err) => done(err));
    });
});