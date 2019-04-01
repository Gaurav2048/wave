const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
    name:{
        required: true,
        type:String,
        unique: 1,
        maxlength: 100
    }
});

const Wood = mongoose.model('Woods', woodSchema);
module.exports = {Wood};


