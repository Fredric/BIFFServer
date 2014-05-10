module.exports = function (passport, app) {


    var util = require('util'),
        LocalStrategy = require('passport-local').Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        users = global.userDb.collection('usercollection');


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

    function findByEmail(email, fn) {


    }


    passport.serializeUser(function (user, done) {
        global.io.sockets.in(user.username).emit('personalmessage', 'Serialized')
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {


        findById(id, function (err, user) {

            global.io.sockets.in(user.username).emit('personalmessage', 'Deserialized')

            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOKCLIENTID,
            clientSecret: process.env.FACEBOOKCLIENTSECRET,
            callbackURL: process.env.FACEBOOKCCALLBACKURL,
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {

            users.findOne({facebookId: profile.id}, function (err, user) {

                if (err) {
                    return done(err);
                }

                if (!user) {
                    //Noone with that facebook id. Create user with facebook info
                    var user = {
                        username: profile.displayName,
                        password: 'efwfqewef2§3f23§§13d2§32f§32f§23f',
                        email: profile.emails[0]
                    }
                }

                user.facebookId = profile.id

                user.fb = {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    profile: profile
                };

                if (user._id) {
                    users.updateById(user._id, user, function () {
                        done(null, user);
                    });
                } else {
                    users.insert(user, {safe: true}, function () {
                        done(null, user);
                    });
                }

            })

            findByEmail(profile._json.email, function (err, user) {

                    if (!user) {
                        return done(err);
                    }

                }

            );
        }
    ));

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


    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/success',
            failureRedirect: '/' }));

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


}
