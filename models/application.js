const Application = function (args) {
    const app = {};
    app.email = args.email;
    app.password = args.password;
    app.confirm = args.confirm;
    app.status = 'pending';
    app.message = null;
    app.isValid = function () {
        return app.status === 'validated';
    };
    app.setInvalid = function (message) {
        app.status = 'invalid';
        app.message = message;
    };
    app.isInvalid = function () {
        return !app.isValid();
    };
    app.validate = function () {
        app.status = 'validated';
    };
    return app;
};

module.exports = Application;