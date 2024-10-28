import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/User/Login';
import LandingPage from './pages/LandingPage';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Dashboard from './components/Admindashboard/Dashboard';
import VideoApp from './components/Admindashboard/Video/VideoApp'
import IndexArticle from './components/Admindashboard/Article/IndexArticle'

import Indexpage from './components/Admindashboard/User details/Indexpage'
import Message from './components/Admindashboard/Message';
const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      
      <Route path="/upload/video" element={<VideoApp />} />
      
      <Route path="/upload/article" element={<IndexArticle />} />
      <Route path="/admin/detail" element={<Indexpage />} />
   
      <Route path="/messageoftheday" element={<Message />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <AppRoutes />
    <Footer />
    </Router>
  );
};

export default App;
