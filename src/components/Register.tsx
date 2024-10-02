// src/components/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertModal from './AlertModal';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5258/api/User/Create', {
        userName,
        password,
      });

      if (response.data.success) {
        setAlertTitle('Success');
        setAlertMessage('User registered successfully');
        setShowAlert(true);
      } else {
        setAlertTitle('Error');
        setAlertMessage('Error creating user: ' + response.data.message);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error registering user', error);
      setAlertTitle('Error');
      setAlertMessage('Error registering user');
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    if (alertTitle === 'Success') {
      navigate('/');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className={`form-control ${error && !userName.trim() ? 'is-invalid' : ''}`}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                if (error) setError('');
              }}
              required
            />
            {error && !userName.trim() && (
              <div className="invalid-feedback">Username is required.</div>
            )}
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${error && !password.trim() ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              required
            />
            {error && !password.trim() && (
              <div className="invalid-feedback">Password is required.</div>
            )}
          </div>
          {error && (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Register
          </button>
        </form>
      </div>
      
      <AlertModal 
        title={alertTitle} 
        message={alertMessage} 
        show={showAlert} 
        onClose={handleCloseAlert} 
        cancelText={"Aceptar"}
      />
    </div>
  );
};

export default Register;
