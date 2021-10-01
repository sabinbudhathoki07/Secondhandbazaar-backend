const express = require('express');
const router = express.Router();
const {check, validationResult}=require('express-validator');
const { model } = require('mongoose');
const Message = require('../models/messageModel');
const auth = require('../middleware/auth')


router.post('/user/message',(req, res) => {
  
    const firstname =req.body.firstname;
    const email =req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const messageData = new Message({
        firstname :firstname,
        email :email,
        subject : subject,
        message : message
    });
    messageData.save()
    .then(function(result){
        res.status(201).json({message:"Message has been seen!!"})
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })


})

router.get('/user/getmessage',function(req,res){

    Message.find()
    .then(function(messageData){
        res.status(200).json(messageData);
    })
    .catch(function(e){
        res.status(500).json({message:e});
    })
})

module.exports =router;