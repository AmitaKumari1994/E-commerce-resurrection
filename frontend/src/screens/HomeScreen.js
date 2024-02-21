// import React,{useEffect, useState} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import  { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import axios from 'axios'


const HomeScreen = () => {

  const {data : products , isLoading, error} = useGetProductsQuery();
  // const [products,setProducts] = useState([])

  // useEffect(()=>{

  //   const fetchProducts = async ()=>{
  //     const {data} = await axios.get('/api/products/')

  //     setProducts(data)
  //   }
  //   fetchProducts()
  // },[])

  //since our backend is in 5000 and front end is in 3000 so it will give cors error we can resolve it using proxy in front-end package.json
  return (

    <>

      { isLoading ? (<Loader/>): error ? (<Message variant = 'danger'>error?.data?.message || error.error</Message>) : (<>
        <h1 className='text-success text-center'>PRODUCTS</h1>
     
     <Row>
       {products.map((product,{index})=>(
         <Col sm={12} md={6} lg={4} xl={3}>
          <Product key={index} product={product}/>
         </Col>
         ))}
     </Row>
      
      </>) }
     
    
          

    </>

  )
}

export default HomeScreen
