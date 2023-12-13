const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    data:[Object],
    user_id:mongoose.Schema.Types.ObjectId,
})
module.exports = mongoose.model("addtocart2",schema);