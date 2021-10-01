
const Product = require('../models/productModel');
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



 it('Add customer testing anything', () => {
 const product = {

'ProductName':'test', 
'Product_ISBN_CODE':'test2',
'ProductType':'test',
'ManufactureCompany':'test', 
'CompanyRating':'4',
'Product_Price':'76766',
'des':'test'


 }
 
 return Product.create(product)
 .then((pro_ret) => {
 expect(pro_ret.ProductName).toEqual('test');
 });
 });
 


//  it('Find Single product testing anything', () => {
//     const product = {
    
//       'Product_ISBN_CODE':'test123', 
      

//     };
    
//     return Product.findOne(product)
//     .then((pro_ret) => {
//     expect(pro_ret.Product_ISBN_CODE).toEqual('test123');
//     });
//     });





//        it('to test the update  product', async () => {
//         return Product.findByIdAndUpdate({_id :Object('607d7938758b2f1b688990cc')}, 
//        {$set : {ProductName:'tested',
//        ProductType:'test'}})
//         .then((pp)=>{
//         expect(pp.ProductName).toEqual('testing')
//         expect(pp.ProductType).toEqual('hari')
//         })
        
//        });


//        it('to test the delete  product', async () => {
//         return Product.findOneAndDelete({_id :Object('607d791f7120e6429493f7b6')}, 
//        {$set : {ProductName:"test1"}})
//         .then((pp)=>{
//         expect(pp.ProductName).toEqual('test1')
//         })
        
//        });



















})