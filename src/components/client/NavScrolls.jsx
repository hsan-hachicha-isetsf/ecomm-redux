import React from 'react'
import {Nav, Navbar,Container} from 'react-bootstrap';
import {Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavScrolls = () => {

    const navigate = useNavigate();
    const {cartTotalQuantity} = useSelector((state) => state.storecart);
  
return (
    <Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand >E-Shopping</Navbar.Brand>
    <Nav className="me-auto">
    <Button variant="danger"  onClick={()=>{navigate("/cart")}} >
              
    <i className="fa-solid fa-cart-shopping"></i>
            <Badge bg="dark">
            {cartTotalQuantity>0?cartTotalQuantity:0}
             </Badge>
    </Button>

      <Nav.Link as={Link} to="/">Home</Nav.Link>
      
    </Nav>
    </Container>
  </Navbar>

  )
}

export default  NavScrolls
