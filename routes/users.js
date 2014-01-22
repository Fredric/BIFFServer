/*
 * GET users listing.
 */
module.exports = function (app) {

    var collection = global.userDb.get('usercollection');

    /***************** L I S T ********************/

    app.get('/users', ensureAuthenticated, function (req, res) {

        collection.find({}, function (err, docs) {
            res.send(docs);

        });
    });


    /***************** G E T ********************/

    app.get('/users/:id',ensureAuthenticated, function (req, res) {
        collection.findOne({_id: collection.id(req.params.id)}, function (e, result) {
            if (e) return next(e)
            res.send(result)
        })
    });


    /***************** P U T ********************/

    app.put('/users/:id', ensureAuthenticated,function (req, res) {
        collection.updateById(req.params.id, req.body, function (err, result) {
            collection.findOne({_id: collection.id(req.params.id)}, function (e, result) {
                if (e) return next(e)
                res.send(result)
            })
        });
    });


    /***************** P O S T ********************/

    app.post('/users', ensureAuthenticated, function (req, res) {
        collection.insert(req.body, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result)

            }
        });
    });


    /***************** D E L E T E ********************/

    app.delete('/users/:id',ensureAuthenticated, function (req, res) {
        collection.remove({_id: collection.id(req.params.id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                res.send(req.body);
            }
        });
    });
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            console.log(req.user)
            return next();
        }
        res.send(403, "Invalid username or password.");
    }

}