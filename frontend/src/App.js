import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Provider } from 'react-redux';
import store from '../src/store'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import 'react-toastify/dist/ReactToastify.css';
import  OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/userListScreen';
import UserEditScreen from './screens/UserEditScreen';



function App() {
  return (
    <>
      <Router>
        <Header />

        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              {/* <Route path="/shipping" element={<ShippingScreen/>} /> */}


              <Route path='' element={<PrivateRoute/>}>
                <Route path='/shipping' element ={<ShippingScreen/>}/>
                <Route path='/payment' element ={<PaymentScreen/>}/>
                <Route path='/placeorder' element ={<PlaceOrderScreen/>}/>
                <Route path='/order/:_id' element ={<OrderScreen/>}/>
              </Route>

              <Route path='' element={<AdminRoute/>}>
                <Route path='/admin/orderlist' element ={<OrderListScreen/>}/>
                <Route path='/admin/productlist' element ={<ProductListScreen/>}/>
                <Route path ='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
                <Route path='/admin/userlist' element ={<UserListScreen/>}/>
                <Route path ='/admin/user/:id/edit' element={<UserEditScreen/>}/>

              </Route>

            </Routes>

            

          </Container>

        </main>
      </Router>

      <Footer />
      <ToastContainer/>
    </>
  )
}

export default App;
