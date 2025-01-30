import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks API requests

// Get All newTransactions
export const allNewTransactions = createAsyncThunk('newTransaction/allNewTransactions', async () => {
    const response = await axios.get(`http://localhost:3003/newTransactions`);
    return response.data;
});

// Get Single newTransactions
export const getSingleNewTransaction = createAsyncThunk('newTransaction/getSingleNewTransaction', async (id) => {
    const response = await axios.get(`http://localhost:3003/newTransactions/${id}`);
    return response.data;
});

// Post Add newTransaction
export const addNewTransaction = createAsyncThunk('newTransaction/addNewTransaction', async ({
    transaction_type,
    transaction_from_name, 
    transaction_from_amount,
    transaction_from_code, 
    transaction_to_name, 
    transaction_to_amount, 
    transaction_to_code, 
    transaction_tag,
    transaction_note,
    transaction_date,
    transaction_to_name_id,
    transaction_from_name_id
  }) => {
     
    const response = await axios.post(`http://localhost:3003/newTransactions`,{
        transaction_type,
        transaction_from_name, 
        transaction_from_amount,
        transaction_from_code, 
        transaction_to_name, 
        transaction_to_amount, 
        transaction_to_code, 
        transaction_tag,
        transaction_note,
        transaction_date,
        transaction_to_name_id,
        transaction_from_name_id
    });
    return response.data;
});

// Put Update newTransaction
export const updateNewTransaction = createAsyncThunk('newTransaction/updateNewTransaction', async ({
    id,
    transaction_type,
    transaction_from_name, 
    transaction_from_amount,
    transaction_from_code, 
    transaction_to_name, 
    transaction_to_amount, 
    transaction_to_code, 
    transaction_tag,
    transaction_note,
    transaction_date,
    transaction_to_name_id,
    transaction_from_name_id
}) => {
    const response = await axios.put(`http://localhost:3003/newTransactions/${id}`,{
        id,
        transaction_type,
        transaction_from_name, 
        transaction_from_amount,
        transaction_from_code, 
        transaction_to_name, 
        transaction_to_amount, 
        transaction_to_code, 
        transaction_tag,
        transaction_note,
        transaction_date,
        transaction_to_name_id,
        transaction_from_name_id
    });
    return response.data;
});

// Delete Single newTransaction
export const deleteNewTransaction = createAsyncThunk('newTransaction/deleteNewTransaction', async (id) => {
    await axios.delete(`http://localhost:3003/newTransactions/${id}`);
    return id;
});


const newTransactionSlice = createSlice({
    name: 'newTransaction',
    initialState: {
        newTransactions: [],
        selectedNewTransaction: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allNewTransactions.fulfilled, (state, action) => {
                state.newTransactions = action.payload;
            })
            .addCase(getSingleNewTransaction.fulfilled, (state, action) => {
                state.selectedNewTransaction = action.payload;  
            })
            .addCase(addNewTransaction.fulfilled, (state, action) => {
                state.newTransactions.push(action.payload);
            })
            .addCase(updateNewTransaction.fulfilled, (state, action) => {
                const index = state.newTransactions.findIndex(c => c.id === action.payload.id);
                if (index !== -1) state.newTransactions[index] = action.payload;
            })
            .addCase(deleteNewTransaction.fulfilled, (state, action) => {
                state.newTransactions = state.newTransactions.filter(c => c.id !== action.payload);
            });
    }
});

export default newTransactionSlice.reducer;