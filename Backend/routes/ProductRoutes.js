const express = require('express');
const router = express.Router();
const {check, validationResult}=require('express-validator');
const { model } = require('mongoose');
const Product = require('../models/productModel');
const auth = require('../middleware/auth')
const upload = require('../middleware/uploads')

router.post('/product/insert',auth.verifyUser,upload.single('pimage'),(req, res) => {
    if(req.file==undefined){
        return res.status(400).json({
            message:"Invalid Image Format!!"      
        })
    }
    const ProductName =req.body.ProductName;
    const Product_ISBN_CODE =req.body.Product_ISBN_CODE;
    const ProductType = req.body.ProductType;
    const ManufactureCompany = req.body.ManufactureCompany;
    const CompanyRating = req.body.CompanyRating;
    const Product_Price =req.body.Product_Price;
    const des = req.body.des;
    const pimage =req.file.path;

    const productData = new Product({
        ProductName:ProductName,
        Product_ISBN_CODE:Product_ISBN_CODE,
        ProductType:ProductType,
        ManufactureCompany:ManufactureCompany,
        CompanyRating:CompanyRating,
        Product_Price:Product_Price,
        des:des,
        pimage :pimage
    });
    productData.save()
    .then(function(result){
        res.status(201).json({message:"Product Added!!"})
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })


})


router.delete('/product/delete/:pid',auth.verifyUser,function(req,res){
	const pid = req.params.pid;
    Product.deleteOne({_id: pid})
    .then(function(result){
		res.status(200).json({message:"Product Deleted!!"})
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })
})

router.put('/product/update/:id',auth.verifyUser,upload.single('pimage'), function(req,res){

    if(req.file === undefined){
        res.status(400).json({message:"invalid file"})
    }
	const id = req.params.id;
	const ProductName =req.body.ProductName;
    const Product_ISBN_CODE =req.body.Product_ISBN_CODE;
    const ProductType = req.body.ProductType;
    const ManufactureCompany = req.body.ManufactureCompany;
    const CompanyRating = req.body.CompanyRating;
    const Product_Price =req.body.Product_Price;
    

	Product.updateOne({_id:id},{
        ProductName : ProductName,
        Product_ISBN_CODE: Product_ISBN_CODE,
        ProductType : ProductType,
        ManufactureCompany:ManufactureCompany,
        CompanyRating:CompanyRating,
        Product_Price:Product_Price,
        pimage:req.file.path
    })
    .then(function(data){
        res.status(200).json({message:"Updated!"})
		
	})
    .catch(function(e){
        res.status(500).json({message:e});

    })
})

router.get('/product/showalls',function(req,res){
    Product.find()
    .then(function(ProdutData){
        res.status(200).json({success:true,data:ProdutData});
    })
})

router.get('/product/showall',function(req,res){
    Product.find()
    .then(function(ProdutData){
        res.status(200).json(ProdutData);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
})


router.get("/product/showalls/:id",function(req,res){
    const id = req.params.id;
    Product.findOne({_id:id})
    .then(function(data){
        res.status(200).json({successs:true,data:data});
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
});


//Update by id get
router.get("/product/single/:id",function(req,res){
    const id = req.params.id;
    Product.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
});

//delete by id 
router.delete('/product/delete/:id',auth.verifyUser,function(req,res){
    const id =res.params.id
    Product.deleteOne({_id:id})
    .then(function(data){
        res.status(200).json({message:"Deleted"});
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
})



router.get("/product/item",auth.verifyUser,function(req,res){    
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token,"secretkey");
    const id = decode.ProductID
    Product.findOne({_id:id})
    .then(function(result){
        res.status(200).json({success:true,data:result});
    })
    .catch(function(err){
        res.status(401).json({message : err,success:false})
    })
});

module.exports =router;
