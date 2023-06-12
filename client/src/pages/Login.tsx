import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URLEnum } from '../RouterEnum';
import { login } from '../service';

function Login() {
  useEffect(() => {
    console.log(navigator.userAgent);
  }, []);

  const navigate = useNavigate();

  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const userLogin = (evt: React.FormEvent) => {
    evt.preventDefault();

    login(username, password)
      .then((res) => {
        const token = res; // Access the token value from response.data
        console.log('Token:', token);
        localStorage.setItem('token', token);

        // Split the token string by dot ('.') character
        const tokenParts = token.split('.');
        if (tokenParts.length >= 2) {
          const encodedPayload = tokenParts[1];
          // Decode the payload using base64 decoding
          const decodedPayload = atob(encodedPayload);
          // Parse the decoded payload as JSON to get the user object
          const user = JSON.parse(decodedPayload);

          console.log('User:', user);

          // Store the user object in localStorage or wherever you need it
          localStorage.setItem('user', JSON.stringify(user));

          // Redirect to the dashboard
          navigate(URLEnum.DASHBOARD);
        } else {
          console.error('Invalid token format');
        }

        // Continue with your logic
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">User Login</h2>
        {error !== '' && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {error}
            <button onClick={() => setError('')} type="button" className="btn-close"></button>
          </div>
        )}
        {errorMessage !== '' && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {errorMessage}
            <button onClick={() => setErrorMessage('')} type="button" className="btn-close"></button>
          </div>
        )}
        <form onSubmit={userLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              onChange={(evt) => setUsername(evt.target.value)}
              required
              type="text"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={(evt) => setPassword(evt.target.value)}
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              onClick={() => setRemember(!remember)}
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
