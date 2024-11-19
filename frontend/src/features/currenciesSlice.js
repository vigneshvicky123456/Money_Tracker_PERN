import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks API requests

// Get All Currencies
export const allCurrencies = createAsyncThunk('currency/allCurrencies', async () => {
    const response = await axios.get(`http://localhost:3003/currencies`);
    return response.data;
});

// Get Single Currency
export const getSingleCurrency = createAsyncThunk('currency/getSingleCurrency', async (id) => {
    const response = await axios.get(`http://localhost:3003/currencies/${id}`);
    return response.data;
});

// Get The Selected Currency
export const getSelectedCurrency = createAsyncThunk('currency/getSelectedCurrency', async () => {
    const response = await axios.get(`http://localhost:3003/selectedCurrency`);
    return response.data;
  });
// Post Selected Currency 
export const addSelectedCurrency = createAsyncThunk('currency/addSelectedCurrency', async (currency_id) => {
    const response = await axios.post(`http://localhost:3003/selectedCurrency`, { currency_id });
    return response.data;
});



export const addCurrency = createAsyncThunk('currency/addCurrency', async (currency) => {
    const response = await axios.post(`http://localhost:3003/currencies`, currency);
    return response.data;
});

export const updateCurrency = createAsyncThunk('currency/updateCurrency', async ({ id, currency }) => {
    const response = await axios.put(`http://localhost:3003/currencies/${id}`, currency);
    return response.data;
});

export const deleteCurrency = createAsyncThunk('currency/deleteCurrency', async (id) => {
    await axios.delete(`http://localhost:3003/currencies/${id}`);
    return id;
});


const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currencies: [],
        selectedCurrency: {},
        currencyModel1: {},
      
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allCurrencies.fulfilled, (state, action) => {
                state.currencies = action.payload;
            })
            .addCase(getSingleCurrency.fulfilled, (state, action) => {
                state.selectedCurrency = action.payload;  
            })
            .addCase(getSelectedCurrency.fulfilled, (state, action) => {
                state.currencyModel1 = action.payload;
              })
            .addCase(addSelectedCurrency.fulfilled, (state, action) => {
                state.selectedCurrency = action.payload;
              })


            .addCase(addCurrency.fulfilled, (state, action) => {
                state.currencies.push(action.payload);
            })
            .addCase(updateCurrency.fulfilled, (state, action) => {
                const index = state.currencies.findIndex(c => c.id === action.payload.id);
                if (index !== -1) state.currencies[index] = action.payload;
            })
            .addCase(deleteCurrency.fulfilled, (state, action) => {
                state.currencies = state.currencies.filter(c => c.id !== action.payload);
            });
    }
});

export default currencySlice.reducer;
