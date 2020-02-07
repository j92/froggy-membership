module.exports.randomString = function() {
    const uuid = require('uuid/v4');
    return uuid();
};