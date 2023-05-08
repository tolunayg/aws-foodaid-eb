import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function LandingPage() {
  const backgroundImage = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%), url(https://images.hdqwalls.com/download/sunrise-landscape-minimalism-5k-ex-1920x1080.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };

  const { loginWithRedirect } = useAuth0();

  return (
    <div style={backgroundImage}>
      <div className="container">
        <div className="jumbotron text-center">
          <h1 className="display-4 font-weight-bold">Welcome to FARS!</h1>
          <p className="lead">Thanks for visiting. This is a simple landing page built using React functional components and styled with Bootstrap.</p>
          <hr className="my-4" />
          <p>Click the button below to get started.</p>
          <a className="btn btn-primary btn-lg" href="dashboard" role="button">Get Started</a>
          {/* <button onClick={() => loginWithRedirect()}>Log In</button> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;