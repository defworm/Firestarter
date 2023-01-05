import React from "react";
import { Nav, NavLink, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "../css/scss/main.css";
// import { toggleMenu } from './main'

function Navigation() {
  return (
    <div className="navbar-main" expand="bg">
    <span>
      <Navbar fixed="top" expand="lg">
        {/* <span className="menu-btn__burger"></span> */}
        <Container className="navbar-main">
          <Nav>
            <NavLink  href="/home" to="./pages/home">HOME
              {/* <i className="fa-solid fa-house"></i> */}
            </NavLink>
            <NavLink href="/products" to="./pages/products">
              PRODUCTS
            </NavLink>
            <NavLink href="/aboutus" to="./pages/about_us">
              ABOUT US
            </NavLink>
            <NavLink href="/profile" to="./profile">
              ACCOUNT
            </NavLink>
            <NavLink href="/checkout" className="shoppingcarticon">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
          </span>
    </div>
  );
}

export default Navigation;