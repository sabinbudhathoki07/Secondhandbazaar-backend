const HomeProduct = require('../models/homeproModel');
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
describe('Product Schema test anything', () => {
// the code below is for insert testing



 it('Add Home Product testing anything', () => {
 const homeproduct = {

'ProductNames':'test', 
'Product_ISBN_CODEs':'test2',
'ProductTypes':'test',
'ManufactureCompanys':'test', 
'CompanyRatings':'4',
'Product_Prices':'76766',
 }
 return HomeProduct.create(homeproduct)
 .then((pro_ret) => {
 expect(pro_ret.ProductNames).toEqual('test');
 });
 });
 


//  it('Find Single Home Product testing anything', () => {
//     const homeproduct = {
    
//       'Product_ISBN_CODEs':'test12', 
      

//     };
    
//     return HomeProduct.findOne(homeproduct)
//     .then((pro_ret) => {
//     expect(pro_ret.Product_ISBN_CODEs).toEqual('test12');
//     });
//     });





//        it('to test the update  product', async () => {
//         return HomeProduct.findByIdAndUpdate({_id :Object('607d7d4e20bcba2d88288eff')}, 
//        {$set : {
//                 ProductNames:'testing',
               
//                }})
//         .then((pp)=>{
//         expect(pp.ProductNames).toEqual('test')
    
//         })
        
//        });


//        it('to test the delete  product', async () => {
//         return HomeProduct.findOneAndDelete({_id :Object('607d7d298236552490405d2b')}, 
//        {$set : {ProductNames:"test"}})
//         .then((pp)=>{
//         expect(pp.ProductNames).toEqual('test')
//         })
        
//        });



















})