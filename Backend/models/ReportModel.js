const mongoose=require("mongoose")
const ReportSchema=new mongoose.Schema({
  title:{
    type:String,
    required:[true,"Provide name"]
  },
  date:{
    type:String,
    required:[true,"Provide date"]
  },
  time:{
    type:String,
    required:[true,"Provide time"]
  },
  location:{
    type:String,
    required:[true,"Provide Location"]
  },
  pictures:{
    type: [String],
  },
  template:{
    type:Number,
  },
  creator:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
},{
  timestamps:true
})

module.exports=mongoose.model('Report',ReportSchema)