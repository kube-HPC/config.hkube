const chai = require("chai");
const expect = chai.expect;
const configIt = require('../index');

describe('config-it', function () {
    describe('config', function () {
        it('should get config with base', done => {
            const config = configIt.load({ useBase: true, configFolder: 'tests' });
            expect(config.main.serviceName).to.equal('config-it-test');
            done();
        });
        it('should get config without base', function (done) {
            const config = configIt.load({ useBase: false, configFolder: 'tests' });
            expect(config.main.serviceName).to.not.equal('config-it-test');
            done();

        });
    });
});

