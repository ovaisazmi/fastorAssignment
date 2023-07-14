const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  name: {type:String, required:true},
  age: {type:Number, required:true},
  email: {type:String, required:true},
  course: {type:String, required:true},
  assignedTo:{ type: String, default: null }
},{
    versionKey:false
});

const formModel = mongoose.model("formCollection", formSchema);

module.exports = formModel;
