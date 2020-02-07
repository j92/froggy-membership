const assert = require('assert');
const utility = require('../lib/utility');

const User = function (args) {
    assert.ok(args.email, 'Email is required');

    const user = {};

    user.email = args.email;
    user.authenticationToken = args.authenticationToken || utility.randomString();
    user.createdAt = args.createdAt || new Date();
    user.status = args.status || 'pending';
    user.signInCount = args.signInCount || 0;
    user.lastLoginAt = args.lastLoginAt || new Date();
    user.currentLoginAt = args.currentLoginAt || new Date();
    user.currentSessionToken = args.currentSessionToken || null;
    user.reminderSentAt = args.reminderSentAt || null;
    user.reminderToken = args.reminderToken || null;

    return user;
};

module.exports = User;