const express = require('express');
const User = require('../models/user');
const router = express.Router();
const body = require("body-parser");
const user = require('../models/user');

// User sign up  route:
router.post('/add', async (req, res) => {
    var { user_keyword,
        user_name,
        user_mobilenumber,
        user_type } = req.body;
        user_type=user_type;

    if (await User.exists({ user_name })) {
        return res.json({ status: "EXIST", message: "this name is already assigned." });
    }
    var data = await User.create({
        user_keyword,
        user_name,
        user_mobilenumber,
        user_type
    });

    return res.json({ status: "OK", message: "user added successfully" });
});

// User delete : 
router.delete('/delete/:id', async (req, res) => {
    var id = req.params.id;

    try {
        var data = await User.findByIdAndDelete(id);
       return res.json({ status: "OK", message: "user deleted successfully" })
    } catch (e) {
        return res.json({ status: "ERROR", message: "user not found" })
    }
});

// GET user details
router.get('/', async (req, res) => {
    try{
    var data = await User.find();
     return res.json({ status: "OK", data: data });

    }
    catch(e){
       return res.json({ status: "ERROR", message: "user not found" })
    }
});

// get user by id 
router.get('/:id', async (req, res) => {
    var id = req.params.id;
    try{
    var data = await User.findById(id);
    return res.json({ status: "OK", message: "user details", data: data });
    }
    catch(e){
        return res.json({ status: "ERROR", message: "user not found" })
    }
})

router.put('/update/:id', async (req, res) => { 
    try{
    var { user_keyword,
        user_name,
        user_mobilenumber,
        user_type } = req.body;
        user_type=user_type;
        

        if( !user_name || !user_mobilenumber || !user_type) {
            return res.json({ status: "ERROR", message: "please fill all the fields" });
        }
    var id = req.params.id;
    var data= await user.findByIdAndUpdate(id,{user_keyword,user_name,user_mobilenumber,user_type});
        data.save();
        data=await user.findById(id);
		return res.json({ status: "OK", message:"update succesfullly", data:data});
    }catch(e)
    {
        return res.json({ status: "ERROR", message: "user not found" })
    }

        
})

module.exports = router;