const express = require('express');
const router = express.Router();
const order=require("./../models/order");
const cart=require("./../models/addtocart");
const cart2=require("./../models/addtocart2");

const user = require('./../models/user');
const Storage=require("./../utilities/memory/storage");
const e = require('express');
 router.post('/add', async (req, res) => {
    var { data , user_id , order_type  ,flag , total , order_disciption , user_dis2 , order_time} = req.body;
    if(!data || !user_id || !order_type)
    {
        return res.json({ status: "ERROR", message: "please fill all the fields" });
    }
    // var date = moment();
    //  order_time = date.format('D/MM/YYYY');
    var temp=0;
     temp=await order.find({order_type:order_type});
    if(order_type==="sale")
    {
    order_id="S/"+(temp.length+1);
    }
    else if(order_type==="purchase")
    {
      order_id="P/"+(temp.length+1);
     
    }
    else if(order_type==="salereturn")
    {
      order_id="SRT/"+(temp.length+1);
    }
    else if(order_type==="purchasereturn")
    {
      order_id="PRT/"+(temp.length+1);
    }
    
    var data=await order.create({data,user_id,order_type , order_time ,order_id, total , order_disciption , user_dis2});
    if(flag==="cart")
    var data=await cart.findOneAndDelete({user_id:user_id});
    else if(flag==="cart2")
    var data=await cart2.findOneAndDelete({user_id:user_id});

    return res.json({ status: "OK", message: "order added successfully" });

 });

 router.put("/edit/:id" , async(req,res)=>{
   const {id}=req.params;
   var data=req.body;
   // console.log(data)
   var {data,user_id,order_type , order_time , total , order_disciption}=data;
   const temp= await order.find({order_type:order_type});
    if(order_type==="sale")
    {
    order_id="S/"+(temp.length+1);
    }
    else if(order_type==="purchase")
    {
      order_id="P/"+(temp.length+1);
     
    }
    else if(order_type==="salereturn")
    {
      order_id="SRT/"+(temp.length+1);
    }
    else if(order_type==="purchasereturn")
    {
      order_id="PRT/"+(temp.length+1);
    }
   var data=await order.findByIdAndUpdate(id,{data,user_id,order_type , order_time , order_id, total , order_disciption});
   return res.json({status:"OK" , message:"order updated successfully" , data:data})
 })
 router.get('/', async (req, res) => {
    
    var {order_type}=req.query;
    if(order_type==="Allhistory")
    {
        var data= (await order.find().populate("user_id")).reverse();
        return res.json({status:"ok" , data:data});
        }
    var data=await order.find({order_type:order_type}).populate("user_id");
    
    return res.json({ status: "OK", data: data  });
 });

 router.get('/:id',async(req,res)=>{
    var id=req.params.id;

    var data= await order.findById(id).populate("user_id");
    return res.json({status:"OK"  , data:data})
 })


module.exports = router;