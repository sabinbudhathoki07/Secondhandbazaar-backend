const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');
const bcrypt =require('bcryptjs');
const {check, validationResult}=require('express-validator');
const { aggregate } = require('../models/customerModel');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const upload = require('../middleware/uploads')


router.post('/customers/signup',
[
    check('fullname',"FirstName must be provided").not().isEmpty(),
    check('email',"Enter a valid email").isEmail(),
    check('email',"email already exists!").custom(value =>{
        return Customer.findOne({email:value})
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
        var CustomerData = new Customer({
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password,
            mobileno : req.body.mobileno,
            //pimage: req.file.path
        });
        // //for encrypting the password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(CustomerData.password,salt,(err,hash)=>{
                if(err) throw err;
                CustomerData.password=hash;
                CustomerData.save().then(function(){
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
router.post('/customer/login',function(req,res){

    
	const email = req.body.email;
	const password = req.body.password;
    



	Customer.findOne({email: email}).then(function(customerModel){

		if(customerModel==null){
			return res.status(403).json({message : "Invalid Credentials!! Null"})
		}

		//res.send("Login Successful")
		bcrypt.compare(password,customerModel.password,function(err,result){

			if (result===false){
				return	res.status(403).json({
					message :"Invalid Credentials!! Result False"})
			}
			//res.send("Authenticated")

			//email and password valid
			const token =jwt.sign({CustomerID:customerModel._id},'secretkey');
           console.log(customerModel._id)
			console.log("Token : " + token)
			res.status(200).json({
				success:true,
				token: token,
                id:customerModel._id
               
			})
			console.log("Login Successfully")
		})
	})
	.catch()
})


router.get('/user/showall',function(req,res){

    Customer.find()
    .then(function(messageData){
        res.status(200).json(messageData);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
})

router.delete('/user/delete/:id', function(req,res){
	const id = req.params.id;
	Customer.deleteOne({_id: id}).then(function(){
		res.send("Deleted")
	})
})





router.put('/customer/update/:id',auth.verifyUser, function(req,res){


    const id = req.params.id;
	const fullname = req.body.fullname;
	const mobileno = req.body.mobileno;
  

	Customer.updateOne({_id:id},{
       
       fullname : fullname,
    mobileno : mobileno
       
        
    })
    .then(function(data){
        res.status(200).json({message:"Updated!"})
		
	})
    .catch(function(e){
        res.status(500).json({message:e});

    })
})


router.get("/user/single/:id", function(req,res){
    const id = req.params.id;
    Customer.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
});


router.get("/customer/account",auth.verifyUser,function(req,res){    
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token,"secretkey"); 
    const id = decode.CustomerID
    Customer.findOne({_id:id})
    .then(function(result){ 
        res.status(200).json({success:true,data:result});
    })
    .catch(function(err){
        res.status(401).json({message : err,success:false})
    })
});



router.get('/user/display',(req,res)=>{

    Customer.find().then(function(customers){
        res.status(200).json(customers)
    
})
})






module.exports = router;