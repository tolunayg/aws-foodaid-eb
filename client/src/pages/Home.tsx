import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './Home.css';

function LandingPage() {
  const backgroundImage = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%), url(https://i.pinimg.com/originals/d3/6d/46/d36d462db827833805497d9ea78a1343.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };

  const handleClick = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      // Redirect to the dashboard
      // Replace 'dashboard' with the actual route for your dashboard
      window.location.href = '/dashboard';
    } else {
      // Redirect to the login page
      // Replace 'login' with the actual route for your login page
      window.location.href = '/login';
    }
  };

  return (
    <div style={backgroundImage}>
      <div className="container">
        <div className="jumbotron text-center">
          <h1 className="display-4 font-weight-bold">Welcome to FARS!</h1>
          <p className="lead">United in resilience, we rise above challenges and forge a path of collective strength and renewal. Thanks for visiting.</p>
          <hr className="my-4" />
          <p>Click the button below to get started.</p>
          <button className="btn btn-lg card3 card-special" onClick={handleClick}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
