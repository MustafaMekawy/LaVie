const mongoose=require("mongoose")
const PlantSchema=mongoose.Schema({
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop",
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    orders:[{
        type:String
    }],
    difficulty:{
        type:String,
        enum:["esey","hard"],
        default:"esey"
    }


})
const plant=mongoose.model("Plant",PlantSchema)
module.exports=plant