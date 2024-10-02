import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { RootState, AppDispatch } from '../store/store';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ userName?: string; password?: string }>({});
  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  const validateFields = () => {
    const newErrors: { userName?: string; password?: string } = {};

    if (!userName) {
      newErrors.userName = 'Username es requerido';
    }

    if (!password) {
      newErrors.password = 'Password es requerido';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateFields()) {
      dispatch(login({ userName, password }));
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Portal Empleados</h2>
        <div className="form-group mb-3">
          <input
            type="text"
            className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button
          onClick={handleLogin}
          className="btn btn-primary btn-block"
          disabled={loading}
          style={{ backgroundColor: '#007bff', borderColor: '#007bff', width: '100%' }}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
        
        <div className="mt-3 text-center">
          <span>No tienes una cuenta? </span>
          <button 
            className="btn btn-link p-0" 
            style={{ color: '#007bff' }} 
            onClick={handleRegisterRedirect}>
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
