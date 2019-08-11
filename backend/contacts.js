var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    name:String,
    phno:Number,
    email:String,
    image:String,
  },
  { timestamps: true }
);
DataSchema.index({name:1},{unique:true});
DataSchema.index({phno:1},{unique:true});
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Contacts", DataSchema);