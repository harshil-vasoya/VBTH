const express = require('express');
const router = express.Router();
const genpdf=require("./../models/genpdf");
router.post('/add', async (req, res) => {
    var {orders , user_id} =req.body;
    
    var data=await genpdf.create({orders , user_id});
    return res.json({status:"OK" , message:"pdf added successfully" , data:data});
});

router.get("/:id" , async(req,res)=>{
    const {id}=req.params;
    var data=await genpdf.findById(id).populate("orders").populate("user_id");

    var totalbillamout=0;
if(data)
{
    data.orders.forEach((element)=>{
        if(element.order_type==="sale" || element.order_type==="purchase")
        totalbillamout=totalbillamout+element.total;
        else if(element.order_type==="salereturn" || element.order_type==="purchasereturn")
        totalbillamout=totalbillamout-element.total;
    })

    
    // const temp=await genpdf.findByIdAndDelete(id);
    return res.json({status:"OK" , message:"pdf data" , data:data , totalbillamout:totalbillamout});
}
return res.json({status:"ERROR" , message:"please go back and select item" });
} )

module.exports = router;