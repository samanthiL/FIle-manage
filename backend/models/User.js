const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Customer_Name : String,
    Amount: String,
    Duration:String,
    imgCollection: {
        type: Array
    }

}, {
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema)