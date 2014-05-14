/*
 * GET users listing.
 */
module.exports = function (app) {

    var collection = global.userDb.collection('usercollection');
    ObjectId = require('mongodb').ObjectID;

    /***************** L I S T ********************/

    app.get('/users', ensureAuthenticated, function (req, res) {

//        collection.find({}, function (err, docs) {
//
//
//        });



        collection.find().toArray(function (err, items) {
            res.send(items);
        });

    });


    /***************** G E T ********************/

    app.get('/users/:id', ensureAuthenticated, function (req, res) {
        collection.findOne({_id: collection.id(req.params.id)}, function (e, result) {
            if (e) return next(e)
            res.send(result)
        })
    });


    /***************** P U T ********************/

    app.put('/users/:id', ensureAuthenticated, function (req, res) {
        //global.io.sockets.in('kalle').emit('roomjoin', 'user listing')
        global.io.sockets.in(req.user.username).emit('personalmessage', 'PUTTING IT')

        delete req.body._id;

        collection.update({_id: ObjectId(req.params.id)}, req.body, function (err, result) {
            collection.findOne({_id: ObjectId(req.params.id)}, function (e, result) {
                if (e) return next(e)
                res.send(result)
            })
        });

//        collection.save(req.body,function (err, result) {
//            collection.findOne({_id: req.body._id}, function (e, result) {
//                if (e) return next(e)
//                res.send(result)
//            })
//        });

//            collection.findOne({_id: collection.id(req.params.id)}, function (e, result) {
//                if (e) return next(e)
//                res.send(result)
//            })
//        });
    });


    /***************** P O S T ********************/

    app.post('/users', ensureAuthenticated, function (req, res) {
        global.io.sockets.in('kalle').emit('roomjoin', 'user listing')
        delete req.body._id;
        collection.insert(req.body, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result)

            }
        });
    });


    /***************** D E L E T E ********************/

    app.delete('/users/:id', ensureAuthenticated, function (req, res) {
        collection.remove({_id: ObjectId(req.params.id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                res.send(req.body);
            }
        });
    });
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.send(403, "Invalid username or password.");
    }

}