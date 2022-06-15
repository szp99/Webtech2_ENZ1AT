const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({

    name : {
      type : String,
      required : true
    },
	latinname : {
      type : String,
      required : true
    },
	type : {
      type : String,
      required : true
    },
    quantity : {
      type : Number,
      required : true
    }
  },
  {
    collection: 'plants'
  });


const Plant = module.exports = mongoose.model("Plant", plantSchema, 'plants');
