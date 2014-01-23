var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    Schema = mongoose.Schema;

/******** Shema *********************/

var UserSchema = new Schema({
    username:   {   type: String    , default: ''           , trim: true    },
    email:      {   type: String    , default: ''           , trim: true    },
    createdAt:  {   type: Date      , default: Date.now                     }
})


/********** Validation ***************/

UserSchema.path('username').required(true, 'Username cannot be blank');


/********** Pre remove hook **********/

UserSchema.pre('remove', function (next) {

  next()
})


/********** Methods ******************/

UserSchema.methods = {


}

/********** Statics ******************/


UserSchema.statics = {


}

mongoose.model('User', UserSchema);
