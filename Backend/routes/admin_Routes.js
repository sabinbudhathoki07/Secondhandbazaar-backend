const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');
const bcrypt =require('bcryptjs');
const {check, validationResult}=require('express-validator');
const { aggregate } = require('../models/adminModel');
const jwt = require('jsonwebtoken');

router.post('/admin/signup',
[
    check('fullname',"FirstName must be provided").not().isEmpty(),
    check('email',"Enter a valid email").isEmail(),
    check('email',"email already exists!").custom(value =>{
        return Admin.findOne({email:value})
        .then(duplicateemail =>{
            if(duplicateemail){
                return Promise.reject("email already exists!")
            }
        });
    }),
    check('email',"Email must be provided").not().isEmpty(),
    check('password',"Password must be provided").not().isEmpty(),
    check('password',"Password must be of at least six characters").isLength({ min:5 })
],
function(req,res){
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        var AdminData = new Admin({
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password
           
        });
        // //for encrypting the password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(AdminData.password,salt,(err,hash)=>{
                if(err) throw err;
                AdminData.password=hash;
                AdminData.save().then(function(){
                    const message='Customer User is added'; 
                    // 201 = created 
                    res.status(201).json({message : message,success : true})
                    console.log(message);
					
					
                }).catch(function(err){
                    
                    res.status(500).json({message:err})
                });
            })
        })  
    }
    else{
        console.log(errors.array());
        res.status(400).json(errors.array());
    }
    
});


//Login
router.post('/admin/login',function(req,res){

	const email = req.body.email;
	const password = req.body.password;


	Admin.findOne({email: email}).then(function(adminModel){

		if(adminModel==null){
			return res.status(403).json({message : "Invalid Credentials!! Null"})
		}

		//res.send("Login Successful")
		bcrypt.compare(password,adminModel.password,function(err,result){

			if (result===false){
				return	res.status(403).json({
					message :"Invalid Credentials!! Result False"})
			}
			//res.send("Authenticated")

			//email and password valid
			const token =jwt.sign({adminID:adminModel._id},'secretkey');
			console.log("Token : " + token)
			res.status(200).json({
				success:true,
				token: token
			})
			console.log("Login Successfully")
		})
	})
	.catch()
})

module.exports = router;