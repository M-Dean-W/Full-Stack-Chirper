import * as React from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const CompleteNav = () => {

    const loc = useLocation();

    if (loc.pathname === "/login" || loc.pathname === "/register") {
      return <></>
    }    
    
    return <Navbar bg="info" expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/chirp">Chirp It!</Nav.Link>
            <Nav.Link as={NavLink} to="/edit">Edit Chrips</Nav.Link>
            <Nav.Link as={NavLink} to="/mentions">User Mentions</Nav.Link>
        </Nav>
    </Navbar.Collapse>
</Navbar>
  }

interface NavProps {}

export default CompleteNav