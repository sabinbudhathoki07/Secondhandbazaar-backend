const express = require('express');
const router = express.Router();
const {check, validationResult}=require('express-validator');
const { model } = require('mongoose');
const HomeProduct = require('../models/homeproModel');
const auth = require('../middleware/auth')
const upload = require('../middleware/uploads')

router.post('/homeproduct/insert',auth.verifyUser,upload.single('pimages'),(req, res) => {
    if(req.file==undefined){
        return res.status(400).json({
            message:"Invalid Image Format!!"      
        })
    }
    const ProductNames =req.body.ProductNames;
    const Product_ISBN_CODEs =req.body.Product_ISBN_CODEs;
    const ProductTypes = req.body.ProductTypes;
    const ManufactureCompanys = req.body.ManufactureCompanys;
    const CompanyRatings = req.body.CompanyRatings;
    const Product_Prices =req.body.Product_Prices;
    const pimages =req.file.path;

    const homeData = new HomeProduct({
        ProductNames:ProductNames,
        Product_ISBN_CODEs:Product_ISBN_CODEs,
        ProductTypes:ProductTypes,
        ManufactureCompanys:ManufactureCompanys,
        CompanyRatings:CompanyRatings,
        Product_Prices:Product_Prices,
        pimages :pimages
    });
    homeData.save()
    .then(function(result){
        res.status(201).json({message:"Product Added!!"})
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })


})


router.delete('/homeproduct/delete/:pid',auth.verifyUser,function(req,res){
	const pid = req.params.pid;
    HomeProduct.deleteOne({_id: pid})
    .then(function(result){
		res.status(200).json({message:"Product Deleted!!"})
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })
})

router.put('/homeproduct/update/:id',auth.verifyUser,upload.single('pimages'), function(req,res){

    if(req.file === undefined){
        res.status(400).json({message:"invalid file"})
    }
	const id = req.params.id;
	const ProductNames =req.body.ProductNames;
    const Product_ISBN_CODEs =req.body.Product_ISBN_CODEs;
    const ProductTypes = req.body.ProductTypes;
    const ManufactureCompanys = req.body.ManufactureCompanys;
    const CompanyRatings = req.body.CompanyRatings;
    const Product_Prices =req.body.Product_Prices;
    

	HomeProduct.updateOne({_id:id},{
        ProductNames : ProductNames,
        Product_ISBN_CODEs: Product_ISBN_CODEs,
        ProductTypes : ProductTypes,
        ManufactureCompanys:ManufactureCompanys,
        CompanyRatings:CompanyRatings,
        Product_Prices:Product_Prices,
        pimages:req.file.path
    })
    .then(function(data){
        res.status(200).json({message:"Updated!"})
		
	})
    .catch(function(e){
        res.status(500).json({message:e});

    })
})

router.get('/homeproduct/showall',function(req,res){

    HomeProduct.find()
    .then(function(ProdutData){
        res.status(200).json(ProdutData);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
})

//search by id
router.get("/homeproduct/single/:id",function(req,res){
    const id = req.params.id;
    HomeProduct.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
});

//delete by id
router.delete('/homeproduct/delete/:id',auth.verifyUser,function(req,res){
    const id =res.params.id
    HomeProduct.deleteOne({_id:id})
    .then(function(data){
        res.status(200).json({message:"Deleted"});
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
})


module.exports =router;
