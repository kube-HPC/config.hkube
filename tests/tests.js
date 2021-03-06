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
            expect(config.main.newServiceName).to.equal('new-config-it-test');
            done();
        });
        it('should throw if env is not found in logger', function (done) {
            configIt._env = 'notExist';
            const configTest = () => configIt.load({ useBase: true, configFolder: 'tests' });
            expect(configTest).to.throw()
            done();
        });
        it('should throw if env is not found in main', function (done) {
            configIt._env = 'onlyLogger';
            const configTest = () => configIt.load({ useBase: true, configFolder: 'tests' });
            expect(configTest).to.throw()
            done();
        });
        it('should throw if env is not found in logger', function (done) {
            configIt._env = 'syntax';
            const configTest = () => configIt.load({ useBase: true, configFolder: 'tests' });
            expect(configTest).to.throw()
            done();
        });
        it('should get env', () => {
            configIt._env = 'myEnv';
            expect(configIt.env()).to.eql('myEnv')
        })
    });
});

