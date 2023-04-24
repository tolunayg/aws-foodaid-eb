import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import component - Page
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const routes =
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/home' element={<Home />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/settings' element={<Settings />} />
    <Route path='*' element={<ErrorPage />} />
  </Routes>
</BrowserRouter>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( routes );
