module.exports = function (passport, app) {

    var util = require('util'),
        LocalStrategy = require('passport-local').Strategy;




    var users = [
        { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' },
        { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
    ];

    function findById(id, fn) {
        var idx = id - 1;
        if (users[idx]) {
            fn(null, users[idx]);
        } else {
            fn(new Error('User ' + id + ' does not exist'));
        }
    }

    function findByUsername(username, fn) {
        for (var i = 0, len = users.length; i < len; i++) {
            var user = users[i];
            if (user.username === username) {
                return fn(null, user);
            }
        }
        return fn(null, null);
    }

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new LocalStrategy(
        function (username, password, done) {
            // asynchronous verification, for effect...
            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            findByUsername(username, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Unknown user ' + username });
                }
                if (user.password != password) {
                    return done(null, false, { message: 'Invalid password' });
                }

                return done(null, user);
            })

        }
    ));

    /****************** R O U T E S **************************/

    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
        function (req, res) {
            res.redirect('/client');
        });

    app.get('/login', function (req, res) {
        res.render('login', { user: req.user, message: req.flash('error') });
    });

    app.use(function (req, res, next) {
        if (req.isAuthenticated() || req.path === '/login') {
            return next();
        }
        res.redirect('/login')
    })

}
