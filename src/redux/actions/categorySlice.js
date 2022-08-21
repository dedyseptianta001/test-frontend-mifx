import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '@src/config/services';
import URL from '@config/url';

export const getCategory = createAsyncThunk("categories", async (payload, { rejectWithValue }, callback) => {
   try {
      const response = await services.get(URL.CATEGORY, payload) 
      return response.data 
   } catch (err) {
      return rejectWithValue(err.response.data)
   }
})

const categorySlice = createSlice({
   name: 'category',
   initialState: {
      category: {
         loading: false,
         data: {},
         error: null,
      },
   },
   extraReducers: {
      [getCategory.pending]: (state) => {
         state.category = {
            loading: true,
         }
      },
      [getCategory.fulfilled]: (state, action) => {
         state.category = {
            loading: false,
            data: action.payload,
            error: null,
         }
      },
      [getCategory.rejected]: (state, action) => {
         state.category = {
            loading: false,
            error: action.error.message,
            data: {},
         }
      },
   },
})

export default categorySlice.reducer