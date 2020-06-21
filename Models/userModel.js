const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const Joigoose = require('joigoose')(mongoose);
const Joi = require('@hapi/joi');

autoIncrement = require('mongoose-auto-increment');

let connection = mongoose.createConnection('mongodb://localhost:27017/ECommerce',{useNewUrlParser: true,
useUnifiedTopology: true  });
autoIncrement.initialize(connection);

var userSchema = Joi.object({
    _id: Joi.number().positive(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    gender:Joi.any().allow("Male","Female"),
    photo: Joi.string().max(255)
    })
  
var User = new Schema(Joigoose.convert(userSchema));
 
User.plugin(autoIncrement.plugin, {
  model: 'User',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});
mongoose.model('User',User ); 