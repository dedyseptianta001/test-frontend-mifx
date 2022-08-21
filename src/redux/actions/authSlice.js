import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '@src/config/services';
import URL from '@config/url';
import Cookies from 'js-cookie';

export const setIsLogin = createAsyncThunk("auth/setIsLogin", async (payload) => {
   return payload
})

export const submitLogin = createAsyncThunk("auth/login", async (payload, { rejectWithValue }, callback) => {
   try {
      const response = await services.post(URL.LOGIN, payload) 

      Cookies.set('token', response.data.token);
      
      return response.data 
   } catch (err) {
      return rejectWithValue(err.response.data)
   }
})

export const submitRegister = createAsyncThunk("auth/register", async (payload, { rejectWithValue }, callback) => {
   try {
      const response = await services.post(URL.REGISTER, payload) 
      return response.data 
   } catch (err) {
      return rejectWithValue(err.response.data)
   }
})

export const Logout = createAsyncThunk("logout", async (payload, { rejectWithValue }, callback) => {
   try {
      const response = await services.get(URL.LOGOUT, payload) 
      Cookies.remove('token');
      return response.data 
   } catch (err) {
      return rejectWithValue(err.response.data)
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      is_login: false,
      login: {
         loading: false,
         data: {},
         error: null,
      },
      register: {
         loading: false,
         data: {},
         error: null,
      },
   },
   extraReducers: {
      // Set Is Login
      [setIsLogin]: (state, action) => {
         state.is_login = action.payload ? true : false;
      },
      // Login
      [submitLogin.pending]: (state) => {
         state.login = {
            loading: true,
         }
         state.is_login = true
      },
      [submitLogin.fulfilled]: (state, action) => {
         state.login = {
            loading: false,
            data: action.payload.data,
            error: null,
         }
      },
      [submitLogin.rejected]: (state, action) => {
         state.login = {
            loading: false,
            error: action.error.message,
            data: {},
         }
      },
      // Register
      [submitRegister.pending]: (state) => {
         state.register = {
            loading: true,
         }
      },
      [submitRegister.fulfilled]: (state, action) => {
         state.register = {
            loading: false,
            data: action.payload.data,
            error: null,
         }
      },
      [submitRegister.rejected]: (state, action) => {
         state.register = {
            loading: false,
            error: action.error.message,
            data: {},
         }
      },
   },
})

export default authSlice.reducer