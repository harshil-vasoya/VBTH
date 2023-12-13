const mongoose = require('mongoose');

const checkforpendrive = new mongoose.Schema({
condition:{
    type:Boolean,
    default:false
}
}
);

module.exports = mongoose.model("checkforpendrive",checkforpendrive);
