import axios from 'axios';
import { CreateEmployee, UpdateEmployee } from '../types/Employee';

const API_BASE_URL = 'http://localhost:5258/api/Employee';


const getAuthHeaders = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};


export const getEmployees = async (token: string, page: number, rowsPerPage: number, filters: { name?: string; position?: string } = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/GetAll`, {
      params: { page, rowsPerPage, ...filters },
      ...getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching employees');
  }
};


export const getEmployeeById = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/GetById/${id}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error('Error fetching employee details');
  }
};


export const createEmployee = async (token: string, employee: CreateEmployee) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Create`, employee, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error('Error creating employee');
  }
};

export const updateEmployee = async (token: string, employee: UpdateEmployee) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Update`, employee, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error('Error updating employee');
  }
};

export const deleteEmployee = async (token: string, id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Delete/${id}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error('Error deleting employee');
  }
};
