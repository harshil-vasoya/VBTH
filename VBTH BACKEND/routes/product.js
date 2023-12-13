const express = require('express');
const router = express.Router();
const product = require('../models/product');
const Storage=require("./../utilities/memory/storage");

// product  add   route:
router.post('/add', async (req, res) => {
    var {product_keyword,product_name,product_number,product_type,product_discription,product_rate} = req.body;

        let keywordList=product_keyword.split(" ");
        product_keyword=[];
        for ( let list of keywordList){
            product_keyword.push(list);
        }
        if(!product_keyword || !product_name || !product_type || !product_rate)
        {
            return res.json({ status: "ERROR", message: "please fill all the fields" });
        }
        if(await product.exists({ product_name }))
        {
            return res.json({ status: "EXIST", message: "this name is already assigned." });
        }

        if (product_number) {
            if (await product.exists({ product_number }))
                return res.json({ status: "EXIST", message: "this number is already assigned." });
            if (product_number > Storage.lastproductnumber) Storage.lastproductnumber = product_number;
        } 
        else {
            Storage.lastproductnumber++;
            product_number = Storage.lastproductnumber;
        }

        var data=await product.create({product_keyword,
            product_name,
            product_number,
            product_type,
            product_discription,
            product_rate});

            res.json({ status: "OK", message: "product added successfully" ,data:data._id});
});

// product  delete : 
router.delete('/delete/:id', async (req, res) => {
    try{
    var id=req.params.id;
    var data=await product.findByIdAndDelete(id);
    return res.json({ status: "OK", message: "product deleted successfully" });   

    }
    catch(e)
    {
        return res.json({ status: "ERROR", message: "product not found" });
    
    }
});

// GET product  details
router.get('/', async (req, res) => {
    try{
  var data=await product.find();
  res.json({ status: "OK",data:data});
    }
    catch(e)
    {
        return res.json({ status: "ERROR", message: "product not found" , e});
    }
});


// get product by id 
router.get('/:id',  async (req, res) => {
    try{
    var id=req.params.id;
    var data=await product.findById(id);
        return res.json({ status: "OK",data:data});
    }
    catch(e)
    {
        return res.json({ status: "ERROR", message: "product not found" });
    }
})

router.put('/update/:id', async (req, res) => {
    try{
    var {product_keyword,product_name,product_number,product_type ,product_discription, product_rate} = req.body;

    if(!product_keyword || !product_name || !product_type || !product_rate)
        {
            return res.json({ status: "ERROR", message: "please fill all the fields" });
        }

    var data=await product.findById(req.params.id);
    if (product_number!=data.product_number) {
        if (await product.exists({ product_number }))
            return res.json({ status: "EXIST", message: "this number is already assigned." });
        if (product_number > Storage.lastproductnumber) Storage.lastproductnumber = product_number;
    } 
    else {
        Storage.lastproductnumber++;
        product_number = Storage.lastproductnumber;
    }
        var data=await product.findByIdAndUpdate(req.params.id,{product_keyword,product_name,product_number,product_type,product_discription,product_rate});
        data.save();
        data=await product.findById(req.params.id);
        return res.json({ status: "OK",data:data});
    }catch(e)
    {
        return res.json({ status: "ERROR", message: "product not found" });
    }

});




module.exports = router;