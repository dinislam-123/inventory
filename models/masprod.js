var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MasprodSchema = new Schema({
 
  prod_no: {
    type: String
    // required: true
  },
  prod_qty:{
      type: String
  }
});

// This creates our model from the above schema, using mongoose's model method

var Masprod = mongoose.model("Masprod", MasprodSchema);

// Export the Article model
module.exports = Masprod;