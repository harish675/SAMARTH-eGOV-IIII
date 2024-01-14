
 const { default: mongoose } = require('mongoose');
const Item = require('../model/ItemDetails');

// 1.create or add the product
module.exports.addItem = async function(req,res){
   
      try{

         console.log(req.body);
         
         const newItem = await Item.create(req.body);         
         console.log("new Item added successfully",newItem);

         return res.status(201).json({
            
              message:"Item is added successfully",
              data:newItem
         })
      }
      catch(err){
  
         console.log("Error in adding item ..",err);
         return res.status(500).json({
              message:"Internal Server Error"
         })
      }
}

//2.delete the product 
module.exports.deleteItem = async function(req,res){

   try{

        const itemId = req.params.id;
        console.log(itemId);

        const deletedItem = await Item.findByIdAndDelete(itemId);

        if(!deletedItem){
          
           console.log("Item not found");

           return res.status(404).json({
            
               error:"Item not found"

           })

        }
       
        console.log("item is deleted Successfully", deletedItem);

        return res.status(200).json({
            message:"Item deleted successfully",
            data:deletedItem
        })  

   }
   catch(err){
      
       console.log("Error in deleting the Item" , err);

       return res.status(500).json({
          message:"Internal Server Error",
       })

   }
     
}

//3.edit the product
module.exports.updateItem = async function(req,res){
     
        try{

            const itemId = req.params.id;
            const updateData = req.body;
            console.log(updateData);

            //check if itemId is valid ObjectId before attempting to update
            
             if(!mongoose.Types.ObjectId.isValid(itemId)){

               console.log("invalid Item Id");

               return res.status(400).json({
                    message:"Invalid Item ID",
               });

             }

            const updatedItem = await Item.findByIdAndUpdate(itemId , updateData ,{new:true});

            if(!updatedItem){
               
                console.log("Item not found");
                return res.status(404).json({
                    message:"Item not found",
                })
            }

            console.log("item updated successfully",updatedItem);

            return res.status(201).json({
                  message:"Product updated successfully",
                  data:updatedItem
            })
        }
        catch(err){
         
          console.log("Error in updating item",err);
          return res.status(500).json({
               message:"Internal Server Error",
          })

        }
}

//4.get all the product list
module.exports.getAllItem = async function(req,res){
        
    try{
           
         const itemList = await Item.find({});
         return res.status(201).json({
              message:"All items fetch successfully",
              data:itemList
         })   
        
    }catch(error){

        console.log("error in getting all item ",error);
        return res.status(500).json({
            message:"Internal Server Message",
        })
    }

}

//5.get one specific product
module.exports.getItem =async function(req,res){

   try{

      const itemId = req.params.id;

      const item = await Item.findById(itemId);

      if(!item){
          console.log("item not found");
          return res.status(404).json({
              message:"Item not Found",
          })
      }

      console.log("item found successfully",item);

      return res.status(201).json({
            message:"Item fetch successfully",
            data:item     
      })
   }
   catch(err){
      
       console.log("Error in getting the item",err);

       return res.status(500).json({
            message:"Internal Server Error"
       })

   }
     
}

//6.increase quantity 
module.exports.increaseQuantityItem = async function(req,res){
     
   try{

      const itemId = req.params.id;

       const item = await Item.findById(itemId);

        if(!item){
           console.log("item not found");

           return res.status(404).json({
               message:"Item Not found",
           })
        }
        item.quantity = item.quantity + 1;
        item.save();
        console.log(item.quantity);
        return res.status(201).json({
            message:"Item Quantity increase Successfully",
            data:item
        })

   }catch(err){
      
       console.log("Error in increasing Quantity",err);

       return  res.status(500).json({
            message:"Internal Server Error",
       })

   }

}


//7.decrease quantity 
module.exports.decreaseQuantityItem = async function(req,res){


      try{
          
             const itemId = req.params.id;

             const item = await Item.findById(itemId);

             if(!item){
               
                console.log("item is not found");

                return res.status(404).json({
                     message:"Item not Found",
                })

             }
             if(item.quantity > 0){
               item.quantity  = item.quantity - 1;
               item.save();
             }
             console.log(item.quantity);

             return res.status(201).json({
                   message:"item quantity decreased successfully",
                   data:item,
             })
      }
      catch(error){
         
          console.log("Error in decreasing Quantity",error);

          return res.status(500).json({
               message:"internal Server Error",
          })

      }


}