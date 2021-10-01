
const Customer = require('../models/customerModel');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/sastofurniture';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
describe('Customer Schema test anything', () => {
// the code below is for insert testing
 it('Add customer testing anything', () => {
 const customer = {
 'fullname': 'testing3',
 'email': 'test3@gmail.com',
 "password":"testing",
 "mobileno":"9811328418"
 };
 
 return Customer.create(customer)
 .then((pro_ret) => {
 expect(pro_ret.fullname).toEqual('testing3 ');
 });
 });
 

//  it('login testing anything', () => {
//     const customer = {
    
//     'email': 'testing12@gmail.com',
//     "password":"testing"

//     };
    
//     return Customer.findOne(customer)
//     .then((pro_ret) => {
//     expect(pro_ret.email).toEqual('testing12@gmail.com');
//     expect(pro_ret.password).toEqual('testing');
//     });
//     });





//        it('to test the update  customer', async () => {
//         return Customer.findByIdAndUpdate({_id :Object('607d70b768f61c04402f0f00')}, 
//        {$set : {email:'testing11113@gmail.com',
//                         fullname:'hari'}})
//         .then((pp)=>{
//         expect(pp.email).toEqual('testing1111@gmail.com')
//         expect(pp.fullname).toEqual('sabin')
//         })
        
//        });


//        it('to test the delete  customer', async () => {
//         return Customer.findOneAndDelete({_id :Object('607d70b768f61c04402f0f00')}, 
//        {$set : {email:'testing11113@gmail.com'}})
//         .then((pp)=>{
//         expect(pp.email).toEqual('testing11113@gmail.com')
//         })
        
//        });



















})