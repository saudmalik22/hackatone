const express=require('express');
const productRouter=express.Router();
const {createProduct,updateProduct,fetchProducts , deleteProduct}=require('../controllers/productController');
const authVerify = require('../middleware/authVerify');

productRouter.get('/fetchProducts',authVerify, fetchProducts);
productRouter.post('/createProduct', authVerify,createProduct);
productRouter.put('/updateProduct', authVerify,updateProduct);
productRouter.delete('/deleteProduct',authVerify,deleteProduct);


module.exports=productRouter;