 const product = require("../models/productModel");


const fetchProducts = async (req,res)=>{
    try{
        const output = await product.find();
         res.json({
             data:output,
             status:"success"
         })
    }catch (error){
        res.json({
            data:[],
            status:"error",
            error:error
        })
    }
}


const createProduct =async (req,res)=>{
    try{
        let newProduct = new product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        })
        const addProduct =await newProduct.save();

        res.json({
            data:addProduct,
            status:"success",
        })
    }catch (error) {
           res.json({
               data:[],
               status:"error",
               error:error
           })
    }
}



const updateProduct = async (req,res)=>{
    try{
        let updateId =req.body.id;
        let updateProduct ={
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }

        const updatedProduct = await product.updateOne({id:updateId},updateProduct)
        res.json({
            data:updatedProduct,
            status:"success",
        })
    }catch (error) {
        res.json({
            data:[],
            status:"error",
            error:error
        })
    }
}


const  deleteProduct = async (req,res)=>{
    try{
        let deleteId = req.body.id;
        const deleteProduct = await product.deleteOne({id:deleteId});
        res.json({
            data:deleteProduct,
            status:"success"
        })
    }catch (error) {
        res.json({
            data:[],
            status:"error",
            error:error
        })
    }
}

module.exports={
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
}