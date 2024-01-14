
const mongoose = require('mongoose');

const itemDetailsSchema = new mongoose.Schema({ 

      name:{
        
         type:String,
         required : true,
      },
      category:{
         type:String,
      },
      description:{
          type:String
      },
      quantity:{
         
         type:Number,
         default:0,
      },
      price:{
         type:Number,
         required:true,
      },
      supplierInfo:{
         
         type:String,
        required:true,
      }
},{
     timestamps:true,
})
const ItemDetails = mongoose.model('ItemDetails', itemDetailsSchema);

module.exports = ItemDetails;
