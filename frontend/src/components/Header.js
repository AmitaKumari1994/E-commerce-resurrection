// import React, { useState } from 'react'
// import { RightTextDesign, NavbarLinkExtended, NavbarContainer, LeftContainer, RightContainer, NavbarInnerContainer, NavbarExtendedContainer, NavbarLinkContainer, NavbarLink, Logo, OpenLinksButton } from '../Assets/Wrappers/Header';
// import logoimg from '../Assets/Images/logo.png';
// import loginimg from '../Assets/Images/login.png';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Badge } from 'react-bootstrap';


// const Header = () => {

//   const { cartItems } = useSelector((state) => state.cart)
//   const { userInfo } = useSelector((state) => state.auth)
//   //useSelector is used for getting the state value of cart
//   const [extendedNavbar, setExtendedNavbar] = useState(false)
//   return (
//     <NavbarContainer extendedNavbar={extendedNavbar}>
//       <NavbarInnerContainer>
//         <LeftContainer>
//           <NavbarLinkContainer>

//             <NavbarLink to="/">Home</NavbarLink>
//             <NavbarLink to="/Product">Products</NavbarLink>
//             <NavbarLink to="/contactUs">ContactUs</NavbarLink>
//             <NavbarLink to="/About">About</NavbarLink>
//             <OpenLinksButton onClick={() => {
//               setExtendedNavbar((curr) => !curr);
//             }}> {extendedNavbar ? <> &#10006; </> : <> &#8801; </>}</OpenLinksButton>
//           </NavbarLinkContainer>
//         </LeftContainer>
//         <RightContainer>
//           <Logo src={logoimg}></Logo>

//           <Link to="/cart"><RightTextDesign>CART
//             {
//               cartItems.length > 0 && (
//                 <Badge pill bg='success' sytle={{ marginLeft: '5px' }}>
//                   {cartItems.reduce((a, c) => a + c.qty, 0)}
//                 </Badge>
//               )
//             }
//           </RightTextDesign> </Link>

//           <Logo src={loginimg}></Logo>

//           <Link to="/login">
//             <RightTextDesign>
//               {userInfo ? `${userInfo}` : `LOGIN` }
//             </RightTextDesign>
//           </Link>


//         </RightContainer>
//       </NavbarInnerContainer>
//       {extendedNavbar &&
//         <NavbarExtendedContainer>
//           <NavbarLinkExtended to="/">Home</NavbarLinkExtended>
//           <NavbarLinkExtended to="/Product">Products</NavbarLinkExtended>
//           <NavbarLinkExtended to="/contactUs">ContactUs</NavbarLinkExtended>
//           <NavbarLinkExtended to="/About">About</NavbarLinkExtended>

//         </NavbarExtendedContainer>
//       }


//     </NavbarContainer>
//   )
// }

// export default Header

import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
// import SearchBox from './SearchBox';
// import logo from '../assets/logo.png';
// import { resetCart } from '../slices/cartSlice';

const Header = () => {
  
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      // dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <header>
      <Navbar bg='primary' variant='dark'  collapseOnSelect style={{padding: 0.5+`px` }}>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              {/* <img src={logo} alt='ProShop' /> */}
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className= 'ml-auto'>
              {/* <SearchBox /> */}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout 
                    </NavDropdown.Item>
                    
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}

              
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
