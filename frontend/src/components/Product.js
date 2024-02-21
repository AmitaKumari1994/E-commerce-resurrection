import React from 'react'
import {Card} from 'react-bootstrap';
import Rating from './Rating'
import product from '../products';
import { Link } from 'react-router-dom';


const Product = ({product}) => {
  return (
    <Card className = "my-3 p-3"style={{ width: '18rem' }}>

      < Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      
      <Card.Body>

        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
              <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as ='div' >
            <Rating
              stars={product.rating}
              reviews={`${product.numReviews}`}
              
            />
        </Card.Text>


        <Card.Text as="h5">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product
