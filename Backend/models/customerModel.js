const mongoose = require('mongoose');

const Customer= mongoose.model('Customer', {
    
    //Easy Signup
	fullname: { 
        type: String,require:true
    },
    email :{
        type: String,require:true,unique:true 
    },
    password :{
        type: String,require:true
    },
    mobileno: { 
        type: String ,require:true
    },
    userimg:{
        type:String,require:true
    }
});

module.exports = Customer;