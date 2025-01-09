const mongoose = require('mongoose');


const ownerSchema = new mongoose.Schema({
    
    fullname: String,
    password: String,
    email: String,
    contact:Number,
    products:{
        type: Array,
        default: []
    },
    
    picture : String,
    gstin: String,
})
module.exports = mongoose.model('owner', ownerSchema);