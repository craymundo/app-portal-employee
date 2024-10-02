/* eslint-disable jsx-a11y/anchor-is-valid */
// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { logout } from '../features/auth/authSlice';
import Loading from './Loading';
import AlertModal from './AlertModal';
import NotificationComponent from './NotificationComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSignOutAlt, faUserPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { deleteEmployee, getEmployees } from '../services/employeeService';
import { Employee } from '../types/Employee';
import FilterComponent from './FilterComponent';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token) || '';

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);

  const [searchName, setSearchName] = useState('');
  const [searchPosition, setSearchPosition] = useState('');

  const [sortColumn, setSortColumn] = useState<keyof Employee | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployees(token, page, rowsPerPage, { 
        name: searchName, 
        position: searchPosition 
      });
      console.log(response);
      if (response.success) {
        setEmployees(response.data.employees);
        setTotalEmployees(response.data.totalRecords);
      }
    } catch (error: any) {
      console.error('Error fetching employees:', error);
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEmployees();
    } else {
      navigate('/');
    }
  }, [page, rowsPerPage, token, searchName, searchPosition]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleDelete = async () => {
    try {
      

      await deleteEmployee(token, selectedEmployeeId);
      fetchEmployees();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const confirmDelete = (id: number) => {
    setSelectedEmployeeId(id);
    setShowModal(true);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalEmployees / rowsPerPage)) {
      setPage(newPage);
    }
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const handleEdit = (id: number) => {
    navigate(`/employee/edit/${id}`);
  };

  const totalPages = Math.ceil(totalEmployees / rowsPerPage);

  const handleFilter = () => {
    setPage(1);
    fetchEmployees();
  };

  const handleClearFilter = () => {
    setSearchName('');
    setSearchPosition('');
    setPage(1);
    fetchEmployees();
  };

  const handleSort = (column: keyof Employee) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortColumn) return 0;

    let valA = a[sortColumn];
    let valB = b[sortColumn];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (typeof valA === 'boolean' && typeof valB === 'boolean') {
      return sortDirection === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
    }
    return sortDirection === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
  });

  return (
    <div>
    


      <div className="container mt-5">

      <h1>Employee Management</h1>
      <NotificationComponent />
      <FilterComponent
          searchName={searchName}
          searchPosition={searchPosition}
          setSearchName={setSearchName}
          setSearchPosition={setSearchPosition}
          handleFilter={handleFilter}
          handleClearFilter={handleClearFilter}
        />
    

      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th onClick={() => handleSort('id')}>ID {sortColumn === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('name')}>Nombre {sortColumn === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('description')}>Descripcion {sortColumn === 'description' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('position')}>Posicion {sortColumn === 'position' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('isActive')}>Status {sortColumn === 'isActive' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.length > 0 ? (
                sortedEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.description}</td>
                    <td>{emp.position}</td>
                    <td>{emp.isActive ? 'Activo' : 'Inactivo'}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(emp.id)}>
                      <FontAwesomeIcon icon={faEdit} />          Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(emp.id)}>
                      <FontAwesomeIcon icon={faTrash} />    Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                   No se encontro los empleados
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span>
                del {Math.min((page - 1) * rowsPerPage + 1, totalEmployees)} al {' '}
                {Math.min(page * rowsPerPage, totalEmployees)} de {totalEmployees} registros
              </span>
            </div>

            <div>
              <label htmlFor="rowsPerPage" className="mr-2">Registros por pagina:</label>
              <select
                id="rowsPerPage"
                className="form-control d-inline-block w-auto"
                value={rowsPerPage}
                onChange={handleRowsChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="pagination">
              <button
                className="btn btn-outline-primary"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span className="mx-2">
                Pagina {page} de {totalPages}
              </span>
              <button
                className="btn btn-outline-primary"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}

      <AlertModal
        show={showModal}
        title="Confirmacion Eliminar Empleado"
        message="Desea eliminar el empleado seleccionado?"
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        cancelText="Cancelar"
        confirmText="Si, Eliminar"
      />
    </div>
    </div>
  );
};

export default Home;
