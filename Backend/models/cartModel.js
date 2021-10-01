const mongoose = require('mongoose');
const CartItem = mongoose.model('CartItem', {
  CartItemid: {
    type:String,
    require:true
  },
  CartItemUser:{
    type:String,
    require:true
  }
});
module.exports = CartItem;