const mongoose = require('mongoose');

const Admin = mongoose.model('Admin', {
    //Easy Signup
	fullname: { 
        type: String,require:true
    },
    email :{
        type: String,require:true,unique:true 
    },
    password :{
        type: String,require:true
    }
});

module.exports = Admin;