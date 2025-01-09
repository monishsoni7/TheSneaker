const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    fullname: String,
    password: String,
    email: String,
    contact:Number,
    cart:{
        type: Array,
        default: []
    },
    order:{
        type:Array,
        default: []
    },
    picture : String,

})
module.exports = mongoose.model('user', userSchema);