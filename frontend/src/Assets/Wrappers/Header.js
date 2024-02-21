import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`

width:100%;
height: ${(props)=>(props.extendedNavbar ? "100vh":"50px")};
display:flex;
flex-direction: column;
background-color: black;
margin:0px;
padding:0px;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex:70%;
    padding-left:50px;
    height:-1px;
    justify-content: flex-start;
    /* background-color: red; */
    align-items: center;
    

`
export const RightContainer = styled.div`
    display: flex;
    flex:30%;
    justify-content: flex-end;
    padding-right:50px;
    height:-1px;
    /* background-color: green; */
    align-items: center;

   
`
export const NavbarInnerContainer = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
`

export const NavbarLinkContainer = styled.div`
    display: flex;
`;

export const NavbarLink = styled(Link)`
    color:White;
    font-size: small;
    text-decoration: none;
    margin: 0px;
    padding: 10px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: black;
    &:hover{
      background-color: silver;
      color: black;
    }
    

    @media(max-width:700px){
    display: none;
  }

`;
export const Logo = styled.img`

    margin:10px;
    max-width: 180px;
    height:33px;
    -webkit-filter: invert(100%);
    

`;

export const h1 = styled.div`
text-transform:none;
`;
export const OpenLinksButton = styled.button`
  width: 70px;
  height: 41px;
  background: none;
  border: none;
  color: grey;
  font-size: 26px;
  max-width: 180px;

  @media(min-width:700px){
    display: none;
  }
  

`;
export const NavbarExtendedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    

    @media(min-width:700px){
    display: none;
  }
    
`;

export const NavbarLinkExtended =styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color:white;
    margin: 10px;
    &:hover{
        
        background-color: grey;
    }
    `
  
export const RightTextDesign = styled.h4`
  color: whitesmoke;
  margin: 2px;
  font-size: x-small;
`


    ;
