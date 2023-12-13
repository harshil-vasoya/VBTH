const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    product_keyword:[String],
    product_name:
    { type:String,
	    required:true,
        unique:true
    },
    product_number:{
		type:Number,
		required:true,
		unique:true
	},
    product_discription:String,
    product_rate:[Object],

    product_type:String
})
module.exports = mongoose.model("product",schema);