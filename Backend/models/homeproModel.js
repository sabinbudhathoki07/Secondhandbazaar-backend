const mongoose = require('mongoose');

const  HomeProduct= mongoose.model('HomeProduct', {
    //Easy Signup
	ProductNames: { 
        type: String,require:true
    },
    Product_ISBN_CODEs:{
        type: String,require:true,
        unique:true 
    },
    ProductTypes:{
        type: String, require:true
    },
    ManufactureCompanys: { 
        type: String,require:true
        },
    CompanyRatings:{
        type: Number,require:true
    },
    Product_Prices:{
        type: Number,require:true
    },

    pimages:{
        type:String,require:true
    }
});

module.exports = HomeProduct;