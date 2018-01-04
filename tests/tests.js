/*
 * Created by nassi on 28/08/16.
 */

'use strict';

var chai = require("chai");
var expect = chai.expect;
var sinon = require('sinon');
var mockery = require('mockery');
var configIt = require('../index');
var moduleName = 'config-it';

describe('config-it', function () {

    // Enable mockery at the start of your test suite
    before(function (done) {
        mockery.enable({
            useCleanCache: false,
            warnOnReplace: true,
            warnOnUnregistered: false
        });
        done();

    });
    after(function (done) {
        mockery.deregisterAll();
        mockery.disable(); // Disable Mockery after tests are completed
        done();
    });

    describe('config', function () {
        it('should get config with base',  done => {
          let config =  configIt.load({  useBase: true,configFolder: 'tests'});
          expect(config.main.serviceName).to.equal('config-it-test');
            done();
        });
        it('should get config without base', function (done) {
            let config =  configIt.load({  useBase: false,configFolder: 'tests'});
                expect(config.main.serviceName).to.not.equal('config-it-test');
                done();
        
        });
    });
});

