import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

const Styles = styled.div`
  .navbar {
    background-color: #222;
    display: flex;
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;


export const NaviBar = () => (
    <Styles>
      <Navbar tt2 bg="light" expand="lg"> 
        <Navbar.Brand href="/">OBMT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link><Link to="/landing">Landing</Link></Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link><Link to="/maincontent">Content Page</Link></Nav.Link></Nav.Item>
          </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search Tags" className="mr-sm-2" />
            <Button variant="outline-success">Go</Button>
        </Form>
        </NavbarCollapse>
      </Navbar>
    </Styles >
  )

