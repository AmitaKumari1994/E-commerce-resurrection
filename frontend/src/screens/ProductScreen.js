import React from 'react'
import products from '../products';
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice'
import Rating from '../components/Rating'
import HomeScreen from '../screens/HomeScreen';
import {useParams,useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react';
import { OpenLinksButton, ImageLoading, buttonStyling } from '../Assets/Wrappers/ProductScreen'
import { Link } from 'react-router-dom';
import { Form,Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
// import axios from 'axios';
import {addToCart} from '../slices/cartSlice'
import { useDispatch } from 'react-redux';



const ProductScreen = () => {
  const { id:productId } = useParams();
  const {data: product , isLoading , error } = useGetProductsDetailsQuery(productId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty,setQty]=useState(1);

  const addToCartHandler = () =>{
    dispatch(addToCart({...product, qty}));
    navigate('/cart');
  }


  // const [product , setProduct] = useState({});

  // //match.params.id since we have added /:id in the app.js screen
  //  const { id:productId } = useParams();

  // useEffect(()=>{
  //   const fetchProducts = async()=>{
  //     const {data} = await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   }

  //   fetchProducts()
  // },[productId])

  // const product = products.find((item) => item._id === id)
  return (
    <>

<OpenLinksButton>
       <Link to="/" element={<HomeScreen />}> GO BACK </Link>
     </OpenLinksButton>

    { isLoading ? (<Loader/>): error ? (<Message variant='danger'>error?.data?.message || error.error</Message>):(<>
      



     <Row>
       <Col md={6}>
         <Image style={{ margin: `15px` }} src={product.image} alt={product.name} fluid></Image>
       </Col>

       <Col md={3}>
         <ListGroup variant='flush' >
           <ListGroupItem>
             <h3>{product.name}</h3>
           </ListGroupItem>

           <ListGroupItem>
             <Rating
               stars={product.rating}
               reviews={`${product.numReviews} reviews`}
             />
           </ListGroupItem>

           <ListGroupItem>
             Price: ${product.price}
           </ListGroupItem>

           <ListGroupItem>
             Description: ${product.description}
           </ListGroupItem>
         </ListGroup>
       </Col>

       <Col md={3}>
         <ListGroup as='ul'>


           <ListGroupItem>
             <Row>
               <Col>
                 Price:
               </Col>
               <Col>
                 <strong>${product.price}</strong>
               </Col>
             </Row>
           </ListGroupItem>

           <ListGroupItem>
             <Row>
               <Col>
                 Stock:
               </Col>
               <Col>
                 {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
               </Col>
             </Row>
           </ListGroupItem>
           
           <ListGroupItem>
            <Row>
              <Col>Qty</Col>
              <Col>
                <Form.Control 
                 as ='select'
                 value={qty}
                 onChange ={(e)=> setQty(Number(e.target.value))}
                 >
                    {[...Array(product.countInStock).keys()].map((x)=> (

                      <option key={x+1} value={x+1}> {x+1}</option>
                    ))}
                </Form.Control>
              </Col>
            </Row>
           </ListGroupItem>


           
             <ListGroupItem>
               <Button 
                className='btn-block'
                 type='button'
                    disabled={product.countInStock===0} 
                    onClick ={addToCartHandler}>
                Add to Cart
                </Button>
             </ListGroupItem>

           


         </ListGroup>
       </Col>
     </Row>
    </>)}
     


    </>

  )
}

export default ProductScreen
