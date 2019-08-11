import React from 'react';
import {Navbar} from 'react-bootstrap';
function Header() {
  return (
    <NavBar></NavBar>
  )
}

function NavBar() {
  return (
  <Navbar bg="dark" variant="dark" sticky="top">
    <NavBarBrand></NavBarBrand>
  </Navbar>
  )
}
function NavBarBrand(){
  return (
    <Navbar.Brand href="#home">Address Book</Navbar.Brand>
  )
}


export default Header;