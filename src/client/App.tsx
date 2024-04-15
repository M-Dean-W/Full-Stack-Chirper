import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Home from './views/Home';
import ChirpDetails from './views/ChirpDetails';
import ChirpIt from './views/ChirpIt';
import EditChirp from './views/EditChirp';
import UserMentions from './views/UserMentions';
import PrivateRoute from './components/PrivateRoute';
import Login from './views/Login';

interface AppProps {}

const App = (props: AppProps) => {
	
	return (
		<BrowserRouter>
		<Navbar bg="info" expand="lg">
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
		<Routes>
			<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/chirps/:id" element={<ChirpDetails />} />
            <Route path="/chirp" element={<ChirpIt />} />
            <Route path="/edit" element={<EditChirp />} />
            <Route path="/mentions" element={<UserMentions />} />
		</Routes>
		</BrowserRouter>
	);
};

export default App;
