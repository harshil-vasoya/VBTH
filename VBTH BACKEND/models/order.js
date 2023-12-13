const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    data:[Object],
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    order_type:{type:String,required:true},
    order_disciption:String,
    order_id:String,
    user_dis2:String,
    total:Number,
    order_time:String
})
module.exports = mongoose.model("order",schema);