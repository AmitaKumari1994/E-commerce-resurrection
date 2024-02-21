import express from 'express';
import path from 'path'
import products from './Data/products.js';
import productRoutes from './routes/productRoutes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import {notFound , errorHandler} from './middleware/errorMiddleware.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cors from 'cors'

import dotenv from 'dotenv';
dotenv.config()
import  connectDB from './config/db.js'



const port = process.env.PORT || 5000



 connectDB();

const app = express()

//Body parser middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Cookie parser middleware

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("API is running")
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes)

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.use(notFound);
app.use(errorHandler);



app.listen(5000,console.log('server running on port 5000'))