// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('userSession') || null, // Obtener el token del localStorage si existe
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ userName, password }: { userName: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5258/api/User/Login', {
        userName,
        password,
      });

      if (response.data.success) {
        const token = response.data.data;
        localStorage.setItem('userSession', token); // Guardar el token en localStorage
        return token;
      } else {
        return thunkAPI.rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error logging in');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('userSession'); // Eliminar el token de localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
