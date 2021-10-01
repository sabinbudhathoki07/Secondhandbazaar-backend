  
const jwt = require('jsonwebtoken');
const Customer =require('../models/customerModel')
const Admin = require('../models/adminModel')

module.exports.verifyUser =function(req,res,next){
   
    try{

        const token =req.headers.authorization.split(" ")[1];
        const decodeData=jwt.verify(token,'secretkey');
        Customer.findOne({_id:decodeData.customerID})
        .then(function(result){
        res.Customer = result
        next()
    })
        .catch(function(err){
        res.status(401).json({message:err})
    })
    }

    catch(err){
        res.status(401).json({message:"Unauthorized Access!"})
    }
}


// /// main guard
module.exports.verifyAdmin =function(req,res,next){
   
    try{

        const token =req.headers.authorization.split(" ")[1];
        const decodeData=jwt.verify(token,'secretkey');
        Admin.findOne({_id:decodeData.adminID})
        .then(function(result){
        res.Admin = result
        next()
    })
        .catch(function(err){
        res.status(401).json({message:err})
    })
    }

    catch(err){
        res.status(401).json({message:"Unauthorized Access!"})
    }
}