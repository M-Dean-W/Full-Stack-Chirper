import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Home from './views/Home';
import ChirpDetails from './views/ChirpDetails';
import ChirpIt from './views/ChirpIt';
import EditChirp from './views/EditChirp';
import UserMentions from './views/UserMentions';
import PrivateRoute from './components/PrivateRoute';
import Login from './views/Login';
import CompleteNav from './components/CompleteNav';

interface AppProps {}

const App = (props: AppProps) => {
	
	return (
		<BrowserRouter>
		<CompleteNav></CompleteNav>
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
