import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '@src/config/services';
import URL from '@config/url';

export const getProduct = createAsyncThunk("products", async (payload, { rejectWithValue }, callback) => {
   try {
      const response = await services.get(URL.PRODUCTS, payload) 
      return response.data 
   } catch (err) {
      return rejectWithValue(err.response.data)
   }
})

export const getProductDetail = createAsyncThunk("product/detail", async (payload) => {
   return payload
})

const productSlice = createSlice({
   name: 'product',
   initialState: {
      product: {
         loading: false,
         data: {},
         error: null,
      },
      detail: {
         loading: false,
         data: {},
         error: null,
      },
   },
   extraReducers: {
      [getProduct.pending]: (state) => {
         state.product = {
            loading: true,
         }
      },
      [getProduct.fulfilled]: (state, action) => {
         state.product = {
            loading: false,
            data: action.payload,
            error: null,
         }
      },
      [getProduct.rejected]: (state, action) => {
         state.product = {
            loading: false,
            error: action.error.message,
            data: {},
         }
      },
      // Set Detail
      [getProductDetail.pending]: (state) => {
         state.detail = {
            loading: true,
         }
      },
      [getProductDetail.fulfilled]: (state, action) => {
         state.detail = {
            loading: false,
            data: action.payload,
            error: null,
         }
      },
   },
})

export default productSlice.reducer