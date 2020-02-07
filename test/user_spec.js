const assert = require('assert');
const should = require('should');

const User = require('../models/user');

describe('User', function () {
    describe('correct defaults', function () {
        let user = {};
        before(function () {
            user = new User({email: 'joost@j92.nl'});
        });

        it('email is joost@j92.nl', function () {
            user.email.should.equal('joost@j92.nl');
        });
        it('has an auth token', function () {
            user.authenticationToken.should.be.defined;
        });
        it('has a pending status', function () {
            user.status.should.equal('pending');
        });
        it('has a created date', function () {
            user.createdAt.should.be.defined;
        });
        it('has a signInCount of 0', function () {
            user.signInCount.should.equal(0);
        });
        it('has lastLogin', function () {
            user.lastLoginAt.should.be.defined;
        });
        it('has currentLogin', function () {
            user.currentLoginAt.should.be.defined;
        });
    });
});