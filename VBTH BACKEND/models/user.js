const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_keyword:String,
    user_name:
    {
        type:String,
        unique:true
    },
    user_mobilenumber:{type:String,required:true},
    user_type:String
    }
    
)

module.exports = mongoose.model("user",schema);