const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartModel');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/cart/item',
    [
        // check('userId', "userId must be filled").not().isEmpty(),
        // check('noteId', "NoteId must be filled").not().isEmpty()
    ],
    auth.verifyUser,
     (req, res) => {
        const errros = validationResult(req);
        if (errros.isEmpty()) {
          console.log("here")
            var post_data = req.body
            var CartItemid = post_data.CartItemid/////check it and ask
            var  CartItemUser = post_data.CartItemUser
            console.log(post_data)
            var data = CartItem({ CartItemid:CartItemid,  CartItemUser:  CartItemUser })
            data.save().then(function () {
                console.log("success")
                res.status(201).json({ success: true, msg: "Bookmarked" })
            }).catch(function (e) {
                res.status(500).json({ success: false, msg: "error" })
            })
        }
        else {
            res.status(400).json({ succes: true, msg: "error here" })
        }
    })
 ///////////////////////////////////////////////////////////////
 router.delete('/favouriteitem/delete/:id',auth.verifyUser,function (req, res) {
        const CartItemid = req.params.id;
        CartItem.deleteOne({CartItemid:CartItemid}).then(function () {
            console.log("here")
            res.status(200).json({ success: true, msg: "Successfully deleted" })
        }).catch(function (e) {
            res.status(201).json({ success: false, msg: "error" })
        })
    })

   /////////////////////////////////////////////////////////////////////////////////
   router.delete('/allfavouriteitem/delete/:id',auth.verifyUser,function (req, res) {
    const CartItemUser = req.params.id;
    CartItem.deleteMany({CartItemUser:CartItemUser}).then(function () {
        console.log("here")
        res.status(200).json({ success: true, msg: "Successfully deleted" })
    }).catch(function (e) {
        res.status(201).json({ success: false, msg: "error" })
    })
})



 
/////////////////////////////////////////////////////////////////////////////

router.get('/cartitem/showall/:id',
    auth.verifyUser,
     (req, res) => {
        const CartItemUser = req.params.id
        CartItem.find({ CartItemUser: CartItemUser }).then(function (data) {
            console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {

            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })
    ////////////////////////
   
  


 
module.exports = router;