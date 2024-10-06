import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './Start.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Home from './Home.js';
import ProfileScreen from './ProfileScreen.js';
import PostList from './PostList.js';
import Register from './Register.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<ProfileScreen />} />
        <Route path="/PostList" element={<PostList />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;