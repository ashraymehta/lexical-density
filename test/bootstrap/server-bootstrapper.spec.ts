import {expect} from 'chai';
import {AddressInfo} from 'net';
import {describe, it} from 'mocha';
import {ServerBootstrapper} from '../../src/bootstrap/server-bootstrapper';

describe('should bootstrap server', async function () {
    const server = await new ServerBootstrapper().bootstrap();

    it('should start server at port 15000', async function () {
        const address = server.address() as AddressInfo;
        expect(address.port).to.equal(15000);
    });

    after(function() {
        server.close();
    });
});