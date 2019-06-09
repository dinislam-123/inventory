var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductionSchema = new Schema({
  
  prod_date: {
    type: String
    // required: true
  },
  // `link` is required and of type String
  prod_no: {
    type: String
    // required: true
  },
  prod_qty:{
     type: String
 },
  prod_dept:{
     type:String
 }
});

// This creates our model from the above schema, using mongoose's model method

var Production = mongoose.model("Production", ProductionSchema);

// Export the Article model
module.exports = Production;