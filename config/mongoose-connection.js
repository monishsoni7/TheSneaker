const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/scatch')
.then(function(){
    console.log('connected to db');
})
.catch(function(err){
    console.log(err);
})
module.exports = mongoose.connection;