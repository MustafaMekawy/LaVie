const mongoose=require("mongoose")
const ShopSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})
const Shop=mongoose.model("Shop",ShopSchema)
module.exports=Shop