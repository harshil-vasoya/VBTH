
const checkforpendrive=require("./../models/checkforpendrive");
// Define your middleware function
const checkCondition = async (req, res, next) => {
    const temp=await checkforpendrive.find();
    const condition = temp[0].condition;


    if (condition) {
      return res.status(403).json({ message: 'Access denied' });
      // You can modify the status code and message as needed
    }
  
    // If condition is met, proceed to the next middleware/route handler
    next();
  };
  
  module.exports = checkCondition;
  