import express from 'express';
const router = express.Router();
// import products from '../Data/products.js'
import {protect, admin} from '../middleware/authMiddleware.js'
import {getProducts,getProductsById,updateProduct, deleteProduct,createProduct} from '../controllers/productController.js'



// router.get('/', asyncHandler ( async (req,res)=>{
//     const products = await Product.find({});
//     // throw new Error('some error'); just for testing
//     res.json(products)
// }));

router.route('/').get(getProducts).post(protect,admin,createProduct);

router.route('/:id')
.get(getProductsById)
router.route('/:id').put(protect,admin,updateProduct)
router.route('/:id').delete(protect,admin,deleteProduct)


export default router;