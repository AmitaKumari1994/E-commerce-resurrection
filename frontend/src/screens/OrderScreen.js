import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery, useDeliveredOrderMutation } from '../slices/orderApiSlices';
import GooglePayButton from '@google-pay/button-react';
import { toast } from 'react-toastify'

import React from 'react'

const OrderScreen = () => {

  const { _id: orderId } = useParams();
  console.log(orderId)
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
  const [deliveredOrder] = useDeliveredOrderMutation(orderId)

  const deliverOrderUpdate = async () => {
    try {
      await deliveredOrder(orderId);
      refetch();
      toast.success('Successfully delivered')

    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  }

  return isLoading ?
    (<Loader />) : error ? (<Message variant='danger' />) : (
      <>
        <h1>
          Order {order.id}
        </h1>

        <Row>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                <h3>Shipping</h3>
                <p>
                  Name:  {order.user.name}
                </p>
                <p>
                  Email:  {order.user.email}
                </p>
                <p>
                  Address:
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode}, {' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}


              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment method</h2>
                <p>
                  Method: {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>
                    Paid on {order.paidAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                {order.orderItems.length === 0 ? (<>
                  <Message>Your cart is empty</Message>


                </>) : (<>
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item) => (
                      <ListGroup.Item >
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                </>)}
              </ListGroup.Item>

            </ListGroup>

          </Col>
          <Col md={4}>
            <Card>
              <ListGroup ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>

                  <Row>
                    <Col>shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>

                </ListGroup.Item>

                {!order.isDelivered && (
                  <ListGroup.Item>
                    <Button type='button' className='btn-sm' onClick={deliverOrderUpdate}>
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}



              </ListGroup>



            </Card>
          </Col>

        </Row>

      </>)
}

export default OrderScreen

// import React from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import { useGetOrderDetailsQuery } from '../slices/orderApiSlices';
// import { addDecimals } from '../Utils/cartUtils'

// const OrderScreen = () => {
//   const { id: orderId } = useParams();
//   const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
//   return isLoading ? (<Loader />) : error ? (<Message variant='danger' ></Message>) : (
//     <>

//       <h3> Order {orderId}</h3>
//       <h6>{order.totalPrice?("yes"):("No")}</h6>


//       <Row>
//         <Col>
//           <ListGroup>
//             <ListGroup.Item>
//               <h3>Shipping</h3>
//               <p>
//                 Name:  {order.user.name}
//               </p>
//               <p>
//                 Email:  {order.user.email}
//               </p>
//               <p>
//                 Address:
//                 {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
//                 {order.shippingAddress.postalCode}, {' '}
//                 {order.shippingAddress.country}
//               </p>
//               {order.isDelivered ? (
//                 <Message variant='Success'>
//                   Delivered on {order.deliveredAt}
//                 </Message>
//               ) : (
//                 <Message variant='danger'>Not Delivered</Message>
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h2>Payment method</h2>
//               <p>
//                 Method: {order.paymentMethod}
//               </p>
//               {order.isPaid ? (
//                 <Message variant='Success'>
//                   Paid on {order.paidAt}
//                 </Message>
//               ) : (
//                 <Message variant='danger'>Not paid</Message>
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               {order.orderItems.length === 0 ? (<>
//                 <Message>Your cart is empty</Message>


//               </>) : (<>
//                 <ListGroup variant='flush'>
//                   <h4>Order Items</h4>
//                   {order.orderItems.map((item) => (
//                     <ListGroup.Item >
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>

//                         <Col>

//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>

//               </>)}
//             </ListGroup.Item>

//           </ListGroup>

//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant='flush'>
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${order.itemsPrice}</Col>
//                 </Row>

//                 <Row>
//                   <Col>shipping</Col>
//                   <Col>${order.shippingPrice}</Col>
//                 </Row>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//             </ListGroup>
//           </Card>
//         </Col>

//       </Row>
//     </>

//   )
// }

// export default OrderScreen

