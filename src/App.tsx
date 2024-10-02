// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeFormPage from './components/EmployeeForm';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
       
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          
           

            <Route element={<Layout />}>
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/employee/new" element={<ProtectedRoute><EmployeeFormPage /></ProtectedRoute>} /> 
              <Route path="/employee/edit/:id" element={<ProtectedRoute><EmployeeFormPage /></ProtectedRoute>} /> 
            </Route>

          </Routes>
       
      </Router>
    </Provider>
  );
};

export default App;
