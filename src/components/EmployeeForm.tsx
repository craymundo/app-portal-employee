// src/components/EmployeeFormPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AlertModal from './AlertModal';
import { createEmployee, getEmployeeById, updateEmployee } from '../services/employeeService';
import { Employee } from '../types/Employee';

const EmployeeFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const token = useSelector((state: RootState) => state.auth.token) || '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const response = await getEmployeeById(token, id);
          const { name, description, position, isActive } = response.data;
          setName(name);
          setDescription(description);
          setPosition(position);
          setIsActive(isActive);
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      }
    };

    if (id) fetchEmployee();
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        const employeeData = {
          id,
          name,
          description,
          position,
          isActive,
        };

       

        await updateEmployee(token, employeeData);

        setModalTitle('Operacion Existosa');
        setModalMessage('Se actualizaron los datos del empleado!');
      } else {
        const employeeData = {
          name,
          description,
          position,
          isActive,
        };

        await createEmployee(token, employeeData);

        setModalTitle('Operacion Existosa');
        setModalMessage('Se registro el empleado!');
      }

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate('/home');
      }, 5000);
    } catch (error) {
      console.error('Error saving employee:', error);
      setModalTitle('Error');
      setModalMessage('Ocurrio un error al guardar los datos.');
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Empleado' : 'Crear Empleado'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descripcion</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Posicion</label>
          <input
            type="text"
            className="form-control"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          <label className="form-check-label">Activo</label>
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {id ? 'Actualizar Empleado' : 'Crear Empleado'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/home')}>
          Cancelar
        </button>
      </form>

      <AlertModal
        show={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default EmployeeFormPage;
