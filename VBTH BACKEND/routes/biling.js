const express = require('express');
const User = require('../models/user');
const router = express.Router();
const product = require('../models/product');
const Cart=require("../models/addtocart");
const Cart2=require("../models/addtocart2");

const user = require('../models/user');

router.get('/product/:id', async (req, res) => {
    try{
  var data=await product.find();
  var userdata=await User.findById(req.params.id);
  var type=userdata.user_type;
  data.map((item)=>{
    
    item.product_rate.map((item2)=>{
       for(let key in item2.price){
           if(key!==type){
               delete item2.price[key]
               
           }
       }
       
    })
})
const updatedArrayOfObjects = data.map(obj => ({
    _id: obj._id,
    product_keyword: obj.product_keyword,
    product_name: obj.product_name,
    product_number: obj.product_number,
    product_rate: obj.product_rate,
    product_discription: obj.product_discription,
    product_type: obj.product_type,
    user_type:userdata.user_type,
    total:0,
    quntity:1,
    isTouch:false,
    __v: obj.__v,
    selectedunit: obj.product_rate[0].name
    // Adding the 'selected' field with a default value
  }));




    return res.json({data:updatedArrayOfObjects});
    }
    catch(e)
    {

    }
});

router.put('/cart', async (req, res) => {
    var{data,user_id}=req.body;

    if(user_id==undefined)
    {
        return res.json({ status: "ERROR", message: "please fill all the fields" });
    }
    if(await Cart.exists({user_id}))
    {
        var tempdata=await Cart.findOneAndUpdate({user_id:user_id} , {data });
        return res.json({ status: "OK", message: "cart updated successfully" });
    }
    var tempdata=await Cart.create({user_id,data});
    return res.json({ status: "OK", message: "cart added successfully" });
})

router.put('/cart2', async (req, res) => {
    var{data,user_id}=req.body;
    if(user_id==undefined)
    {
        return res.json({ status: "ERROR", message: "please fill all the fields" });
    }
    if(await Cart2.exists({user_id}))
    {
        var tempdata=await Cart2.findOneAndUpdate({user_id:user_id} , {data });
        return res.json({ status: "OK", message: "cart updated successfully" });
    }
    var tempdata=await Cart2.create({user_id,data});
    return res.json({ status: "OK", message: "cart added successfully" });
})


router.get('/cart/:id', async (req, res) => {
    var user_id=req.params.id;
    try{
    var data=await Cart.findOne({user_id});
    if(data)
    return res.json({data:data});

    }
    catch(e)
    {
        return res.json({data:[]});
    }
})
router.get('/cart2/:id', async (req, res) => {
    var user_id=req.params.id;
    try{
    var data=await Cart2.findOne({user_id});
    if(data)
    return res.json({data:data});

    }
    catch(e)
    {
        return res.json({data:[]});
    }
})
router.delete('/cart/:id', async (req, res) => {
    const id=req.params.id;
    try{
    var data=await Cart.deleteOne({user_id:id})
    }
    catch(e)
    {
        return res.json({ status: "ERROR", message: "cart not found" });
    }
})

router.delete('/cart2/:id', async (req, res) => {
    const id=req.params.id;
    try{
    var data=await Cart2.deleteOne({user_id:id})
    }
    catch(e)
    {
        return res.json({ status: "ERROR", message: "cart not found" });
    }
})



module.exports = router;