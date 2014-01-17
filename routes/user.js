/*
 * GET users listing.
 */

exports.list = function (req, res) {

    var collection = res.db.get('usercollection');
    collection.find({}, function (err, docs) {
        res.send(docs);

    });
};

exports.getOne = function (req, res) {

    var collection = res.db.get('usercollection');

    collection.findOne({_id: collection.id(req.params.id)}, function(e, result){
        if (e) return next(e)
        res.send(result)
      })


};