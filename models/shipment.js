var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ShipmentSchema = new Schema({
  ship_date: {
    type: String
    // required: true
  },
  // `link` is required and of type String
  prod_no: {
    type: String
    // required: true
  },
  ship_qty:{
     type: String
 }
});

// This creates our model from the above schema, using mongoose's model method

var Shipment = mongoose.model("Shipment", ShipmentSchema);

// Export the Article model
module.exports = Shipment;