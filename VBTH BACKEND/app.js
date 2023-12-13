

// Main Imports
const express = require("express");
const cors = require("cors");
const storage=require("./utilities/memory/storage");
const checkCondition=require("./middleware/checkforpendrive");
require("./config/database").connect(async ()=>{await storage.reloade()});



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = require("./routes/user");
const product = require("./routes/product");
const biling=require("./routes/biling");
const order = require("./routes/order");
const genpdf =require("./routes/genpdf");
const trydaata=require("./routes/try");



app.use("/user",checkCondition,user);
app.use("/product",checkCondition,product);
app.use("/billing",checkCondition,biling);
app.use("/order",checkCondition,order);
app.use("/genpdf",checkCondition,genpdf);
app.use("/try",trydaata);



module.exports = app;
