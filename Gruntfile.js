const r = require('rethinkdb');

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['lib/**/*.js', 'models/**/*.js']
        },
        watch: {
            files: ['lib/**/*.js', 'models/**/*.js'],
            tasks: ['jshint']
        }
    });

    grunt.registerTask('installDb', function () {
        const done = this.async();

        let connection = null;
        r.connect({host: 'localhost', port: 28015}, function (err, conn) {
            if (err) throw err;
            connection = conn;
            createTables(connection, done);
        });
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
};

const createTables = function (connection, done) {
    let tablesCreated = 0;
    const callback = function (err, result) {
        tablesCreated++;
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));

        if (tablesCreated === 3) {
            done();
        }
    };

    r.db('membership').tableCreate('users').run(connection, callback);
    r.db('membership').tableCreate('logs').run(connection, callback);
    r.db('membership').tableCreate('sessions').run(connection, callback);
};