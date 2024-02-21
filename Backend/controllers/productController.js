import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const createProduct = asyncHandler(async (req,res)=>{

    const product = new Product({
        name:'sample 777',
        price:'0',
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'sample description'

    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const getProducts = asyncHandler(async (req,res)=>{
    const products = await Product.find({});
    // throw new Error('some error'); just for testing
    res.status(200).json(products)
})

const getProductsById = asyncHandler(async (req,res)=>{
    const productById = await Product.findById(req.params.id)

    if(productById){
        
        return res.json(productById)
    }else{
        res.status(404);
        throw new Error('Resource not found test');
    }
})

const updateProduct = asyncHandler(async (req,res)=>{
    const {name,price, description, image, brand, category, countInStock} = req.body
    const product = await Product.findById(req.params.id);

    console.log(req.params.id)

    if(product){
        
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        // product.rating = rating,
     
        product.countInStock = countInStock;
        // product.description = description

        const updatedProduct = await product.save()
        res.json(updatedProduct)

    }

    else{

        res.status(404);
        throw new Error ('Resource not found')

    }
})

const deleteProduct = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne({_id:product._id})
        res.status(200).json({"message":"Product deleted"})
    }

    else{
        res.status(404)
        throw new Error("Resource not found")
    }
})
export {createProduct,getProducts, updateProduct, getProductsById, deleteProduct}
