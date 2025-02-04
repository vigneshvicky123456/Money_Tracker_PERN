import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks API requests

const API_URL = "https://money-tracker-pern.onrender.com";

// Get All Accounts
export const allAccounts = createAsyncThunk('account/allAccounts', async () => {
    const response = await axios.get(`${API_URL}/accounts`);
    return response.data;
});

// Get Single Accounts
export const getSingleAccount = createAsyncThunk('account/getSingleAccount', async (id) => {
    const response = await axios.get(`${API_URL}/accounts/${id}`);
    return response.data;
});

// Post Add Account
export const addAccount = createAsyncThunk('account/addAccount', async ({
    account_name,
    account_type, 
    account_balance,
    account_currency_code, 
    account_currency_name, 
    account_currency_name_check, 
    show_on_dashboard 
  }) => {
    const response = await axios.post(`${API_URL}/accounts`,{
        account_name,
        account_type, 
        account_balance,
        account_currency_code, 
        account_currency_name, 
        account_currency_name_check, 
        show_on_dashboard });
    return response.data;
});

// Put Update Account
export const updateAccount = createAsyncThunk('account/updateAccount', async ({
    id,
    account_name,
    account_type, 
    account_balance,
    account_currency_code, 
    account_currency_name, 
    account_currency_name_check, 
    show_on_dashboard
}) => {
    const response = await axios.put(`${API_URL}/accounts/${id}`,{
        id,
        account_name,
        account_type, 
        account_balance,
        account_currency_code, 
        account_currency_name, 
        account_currency_name_check, 
        show_on_dashboard
    });
    return response.data;
});

// Delete Single Account
export const deleteAccount = createAsyncThunk('account/deleteAccount', async (id) => {
    await axios.delete(`${API_URL}/accounts/${id}`);
    return id;
});


const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accounts: [],
        selectedAccount: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allAccounts.fulfilled, (state, action) => {
                state.accounts = action.payload;
            })
            .addCase(getSingleAccount.fulfilled, (state, action) => {
                state.selectedAccount = action.payload;   
            })
            .addCase(addAccount.fulfilled, (state, action) => {
                state.accounts.push(action.payload);
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                const index = state.accounts.findIndex(c => c.id === action.payload.id);
                if (index !== -1) state.accounts[index] = action.payload;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.accounts = state.accounts.filter(c => c.id !== action.payload);
            });
    }
});

export default accountSlice.reducer;
