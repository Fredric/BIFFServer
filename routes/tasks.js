/*
 * GET users listing.
 */
module.exports = function (app) {

    var collection = global.userDb.collection('taskscollection');
    ObjectId = require('mongodb').ObjectID;

    /***************** L I S T ********************/

    app.get('/tasks', ensureAuthenticated, function (req, res) {
        debugger
        collection.find( { createdBy: req.user._id } ).toArray(function (err, items) {
            res.send(items);
        });

    });


    /***************** G E T ********************/

    app.get('/tasks/:id', ensureAuthenticated, function (req, res) {
        collection.findOne({_id: collection.id(req.params.id)}, function (e, result) {
            if (e) return next(e)
            res.send(result)
        })
    });


    /***************** P U T ********************/

    app.put('/tasks/:id', ensureAuthenticated, function (req, res) {
        delete req.body._id;

        req.body.createdBy = req.user._id

        collection.update({_id: ObjectId(req.params.id)}, req.body, function (err, result) {
            collection.findOne({_id: ObjectId(req.params.id)}, function (e, result) {
                if (e) return next(e)
                res.send(result)
            })
        });
    });


    /***************** P O S T ********************/

    app.post('/tasks', ensureAuthenticated, function (req, res) {
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

    app.delete('/tasks/:id', ensureAuthenticated, function (req, res) {
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
        global.io.sockets.in(req.user.username).emit('personalmessage', 'Not Authenticated')

        res.send(403, "Invalid username or password.");
    }

}