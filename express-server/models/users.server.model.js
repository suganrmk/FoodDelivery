import mongoose from 'mongoose';
import Products from './products.server.model'
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

var userSchema = mongoose.Schema({
    _id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    photoUrl: String,
    hash: String,
    token: String,
    // cart: [{ type: Schema.Types.ObjectId, ref: 'Products' }]
});

userSchema.plugin(findOrCreate);
export default mongoose.model('users', userSchema)