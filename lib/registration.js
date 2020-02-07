const Application = require('../models/application');
const User = require('../models/user');
const assert = require('assert');

const RegResult = function () {
    return {
        success: false,
        message: null,
        user: null
    };
};

const Registration = function (db, conn) {
    const self = this;

    const validateInputs = function (app) {
        if (!app.email || !app.password) {
            app.setInvalid('Email and password are required');
        } else if (app.password !== app.confirm) {
            app.setInvalid('Passwords don\'t match');
        } else {
            app.validate();
        }
    };

    const checkIfUserExists = function (app, next) {
        db.table('users').filter(db.row('email').eq(app.email)).run(conn, function (err, cursor) {
            if (err) throw err;
            cursor.toArray(function (err, result) {
                next(null, result.length > 0);
            });
        });
    };

    self.applyForMembership = function (args, next) {
        const result = new RegResult(args);
        const app = new Application(args);
        validateInputs(app);
        checkIfUserExists(app, function (err, exists) {
            assert.ok(err === null, err);
            if (exists === true) {
                app.setInvalid('Email already exists');
            }

            if (app.isValid()) {
                result.success = true;
                result.message = 'Welcome!';
                result.user = new User(args);
            }

            next(null, result);
        });
    };
};

module.exports = Registration;