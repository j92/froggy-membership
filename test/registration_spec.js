const assert = require('assert');
const r = require('rethinkdb');
const Registration = require('../lib/registration.js');

describe('Registration', function () {
    let reg = {};
    before(function (done) {
        r.connect({db: 'membership'}, function (err, db) {
            reg = new Registration(r, db);
            done();
        });
    });
    describe('a valid registration', function () {
        let regResult = {};
        before(function (done) {
            reg.applyForMembership({
                email: 'joost@j92.nl',
                password: 'password',
                confirm: 'password'
            }, function (err, result) {
                assert(err === null, err);
                regResult = result;

                done();
            });
        });

        it('is successful', function () {
            regResult.success.should.equal(true);
        });
        it('creates a user');
        it('creates a log entry');
        it('sets the user\'s status to approved');
    });

    describe('an empty or null email', function () {
        it('is not successful');
        it('tells user that email is required');
    });

    describe('empty or null password', function () {
        it('is not successful');
        it('tells user that password is required');
    });

    describe('password and confirmation mismatch', function () {
        it('is not successful');
        it('tells user passwords dont match');
    });

    describe('email already exists', function () {
        it('is not successful');
        it('tells user that email already exists');
    });
});