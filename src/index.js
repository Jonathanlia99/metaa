import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import './index.css';
import Homes from './pages/home.js'
import Login from './pages/login.js'
import HomePageEmail from './pages/homepageEmail.js'
import NotFoundPage from './components/404Homepage.js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Homes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verification' element={<HomePageEmail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
