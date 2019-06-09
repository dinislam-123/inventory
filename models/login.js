var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var LoginSchema = new Schema({
 
  user_date: {
    type: String
    // required: true
  },
  user_id:{
      type: String
  },
 user_rights:{
     type:String
 },
 user_pwd:{
     type:String
 },
 user_dept:{
     type:String
 }
});

// This creates our model from the above schema, using mongoose's model method

var Login = mongoose.model("Login", LoginSchema);

// Export the Article model
module.exports = Login;