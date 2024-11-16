import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './Start.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Home from './Home.js';
import ProfileScreen from './ProfileScreen.js';
import PostList from './PostList.js';
import Register from './Register.js';
import SearchModal from './SearchModal.js';
import Map from './Map.js';
import QrManagement from './QrManagement.js';
import ItemDetail from './ItemDetail.js';
import ChatScreen from './ChatScreen.js';
import ChatList from './ChatList.js';
import SearchResults from './SearchResults.js';



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
        <Route path="/search" element={<SearchModal />} />
        <Route path="/map" element={<Map />} />
        <Route path="/QrManagement" element={<QrManagement />} />
        <Route path="/item-detail/:postId" element={<ItemDetail />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:id" element={<ChatScreen />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;