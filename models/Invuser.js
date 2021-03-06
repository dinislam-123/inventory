var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
 
  user_date: {
    type: String
    // required: true
  },
  user_id:{
      type: String
  },
 user_name:{
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

var Invuser = mongoose.model("Invuser", UserSchema);

// Export the Article model
module.exports = Invuser;