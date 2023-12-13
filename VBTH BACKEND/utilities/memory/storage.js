const products=require("./../../models/product");
const genpdf=require("./../../models/genpdf");
const storage = {
    lastproductnumber:0,
    reloade: async function(){
        const data = await genpdf.deleteMany({});
        try{
        let product=await products.find({}, { product_number: 1, _id: 0 }).sort({ product_number: -1 }).limit(1);
        if(product.length>0){
          this.lastproductnumber=product[0].product_number;
        }
        
        console.log("store reloaded successfully")
    }catch(e){
        console.log("store reloaded failed")
    }
    
    }

}
module.exports=storage;
