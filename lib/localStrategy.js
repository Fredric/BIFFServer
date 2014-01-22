module.exports = function (passport, app) {

    var util = require('util'),
        LocalStrategy = require('passport-local').Strategy,
        users = global.userDb.get('usercollection');


    function findById(id, fn) {

        users.findById(id, function (err, doc) {
            if (err) {
                fn(new Error('User ' + id + ' does not exist'));
            } else {
                fn(null, doc);
            }

        })


    }

    function findByUsername(username, fn) {

        users.findOne({username: username}, function (err, doc) {
            if (err) {
                return fn(null, null);
            } else {
                return fn(null, doc);
            }
        })
    }

    passport.serializeUser(function (user, done) {
        console.log('serialize')
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        console.log('deserializeUser', id)

        findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new LocalStrategy(
        function (username, password, done) {
            findByUsername(username, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { success: false, errors: [
                        {
                            id: 'username',
                            msg: 'No User like that'
                        }
                    ] });
                }
                if (user.password != password) {
                    return done(null, false, { success: false, errors: [
                        {
                            id: 'password',
                            msg: 'Wrong password'
                        }
                    ] });
                }

                return done(null, user);
            })
        }
    ));

    app.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return res.send(info);
            }
            if (!user) {
                return res.send(info);
            }
            req.login(user, function (err) {
                if (err) {
                    return res.send(info);
                }
                res.send({success: true});
            });
        })(req, res, next);
    });
    app.get('/login', function (req, res) {
        res.render('login', { user: req.user, message: req.flash('error') });
    });

}
