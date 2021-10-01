const mongoose = require('mongoose');

const  Product= mongoose.model('Product', {
    //Easy Signup
	ProductName: { 
        type: String,require:true
    },
    Product_ISBN_CODE:{
        type: String,require:true,
        unique:true 
    },
    ProductType:{
        type: String, require:true
    },
    ManufactureCompany: { 
        type: String,require:true
        },
    CompanyRating:{
        type: Number,require:true
    },
    Product_Price:{
        type: Number,require:true
    },
    des:{
        type: String, require:true
    },

    pimage:{
        type:String,require:true
    }
});

module.exports = Product;