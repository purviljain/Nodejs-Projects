let mongoose = require('mongoose');

// Post Schema
let postSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
   mainimage:{ 
    data: Buffer, 
    contentType: String 
   }
});

let Post = module.exports = mongoose.model('Post', postSchema);
