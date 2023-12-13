const express = require('express');
const fs = require('fs');
const path = require('path');
const router=express.Router();
const order=require("./../models/order");
const product = require('../models/product');
const cart=require("./../models/addtocart");
const cart2=require("./../models/addtocart2");
const user = require('./../models/user');
const storage=require("./../utilities/memory/storage");
const checkforpendrive=require("./../models/checkforpendrive");


router.get("/",async(req,res)=>{
    const productdata=await product.find({})
    fs.writeFileSync("data_prodcutdata", JSON.stringify(productdata, null, 2), 'utf8');
    const orderdata=await order.find();
    fs.writeFileSync("data_orderdata", JSON.stringify(orderdata, null, 2), 'utf8');
    const cartdata=await cart.find();
    fs.writeFileSync("data_cartdata", JSON.stringify(cartdata, null, 2), 'utf8');
    const cartdata2=await cart2.find();
    fs.writeFileSync("data_cartdata2", JSON.stringify(cartdata2, null, 2), 'utf8');
    const userdata=await user.find();
    fs.writeFileSync("data_userdata", JSON.stringify(userdata, null, 2), 'utf8');
    const prendrivedata=await checkforpendrive.find();
    fs.writeFileSync("data_checkforpendrive", JSON.stringify(prendrivedata, null, 2), 'utf8');
    const temp=await checkforpendrive.find();
    await checkforpendrive.findByIdAndUpdate(temp[0]._id,{condition:true});

    return res.json({status:"OK" , message:"now you have to add all the file in to pendriver"});
})

router.get("/add" , async(req,res)=>{
    const temp=await checkforpendrive.find();
    // return;
    await product.deleteMany({});
    await order.deleteMany({});
    await cart.deleteMany({});
    await cart2.deleteMany({});
    await user.deleteMany({});
    const productdata=JSON.parse(fs.readFileSync("data_prodcutdata", 'utf8'));
    const orderdata=JSON.parse(fs.readFileSync("data_orderdata", 'utf8'));
    const cartdata=JSON.parse(fs.readFileSync("data_cartdata", 'utf8'));
    const cartdata2=JSON.parse(fs.readFileSync("data_cartdata2", 'utf8'));
    const userdata=JSON.parse(fs.readFileSync("data_userdata", 'utf8'));
    await product.insertMany(productdata);
    await order.insertMany(orderdata);
    await cart.insertMany(cartdata);
    await cart2.insertMany(cartdata2);
    await user.insertMany(userdata);

    await checkforpendrive.findByIdAndUpdate(temp[0]._id,{condition:false});
    return res.json({status:"OK" , message:"data added successfully" });
})

module.exports=router;