import mongoose from 'mongoose';
import users from './users.server.model'
var Schema = mongoose.Schema;

var productSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    ProductType: String,
    RestaurantType: String,
    City: Object,
    fulladdress: Object,
    Description: {
        Title: String,
        Summary: String
    },
    extradetails: {
        otherdetail: String,
        restaurantrules: String,
        restaurantruleslist: Array
    },
    Location: Object,
    Amenities: {
        Common: Array,
        Additional: Array
    },
    Photos: Array,
    Pricing: {
        Baseprice: Number,
        ForTwo: String,
        currency: String
    },
    timing: String,
    status: String,
    // host: { type: Schema.Types.ObjectId, ref: 'users' }

});

export default mongoose.model('Products', productSchema);