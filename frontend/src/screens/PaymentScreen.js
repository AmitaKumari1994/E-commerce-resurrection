import React from 'react'
import { useState,useEffect } from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import ProceedCheckout from '../components/ProceedCheckout'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'


const PaymentScreen = () => {
    const [paymentmethod, setPaymentMethod] = useState('paypal')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart =useSelector((state)=> state.cart)
    const {shippingAddress} = cart

    const submitHandler = (e)=>{
      e.preventDefault();
      dispatch(savePaymentMethod(paymentmethod))
      navigate('/placeorder')
  }

    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress, navigate])

   

  return (
    <FormContainer>
      <ProceedCheckout  step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                
                type ='radio'
                className='my-2'
                label='Paypal or Credit card'
                id='Paypal'
                name='paymentMethod'
                value='Paypal'
                checked
                onChange={(e)=> setPaymentMethod(e.target.value)}
                >
                </Form.Check>
            </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
