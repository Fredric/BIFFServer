/*
 * GET users listing.
 */

/***************** L I S T ********************/

exports.list = function (req, res) {
    var collection = global.userDb.get('usercollection');
    collection.find({}, function (err, docs) {
        res.send(docs);

    });
};

/***************** G E T ********************/

exports.getOne = function (req, res) {
    var collection = global.userDb.get('usercollection');
    collection.findOne({_id: collection.id(req.params.id)}, function (e, result) {
        if (e) return next(e)
        res.send(result)
    })
};

/***************** P U T ********************/

exports.putOne = function (req, res) {
    var collection = global.userDb.get('usercollection');
    collection.updateById(req.params.id, req.body, function (err, result) {
        collection.findOne({_id: collection.id(req.params.id)}, function (e, result) {
            if (e) return next(e)
            res.send(result)
        })
    });
};

/***************** P O S T ********************/

exports.create = function (req, res) {
    var collection = global.userDb.get('usercollection');
    collection.insert(req.body, {safe: true}, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(result)

        }
    });
};

/***************** D E L E T E ********************/

exports.deleteOne = function (req, res) {
    var collection = global.userDb.get('usercollection');
    collection.remove({_id: collection.id(req.params.id)}, {safe: true}, function (err, result) {
        if (err) {
            res.send({'error': 'An error has occurred - ' + err});
        } else {
            res.send(req.body);
        }
    });
};
