import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Thunks API requests

// Async thunk to fetch reports from the backend
export const fetchReports = createAsyncThunk('reports/fetchReports', async ({ reportsType, year, monthYear }) => {
  console.log(`ASYNC fetchReports reportsType=${reportsType}&year=${year}&monthYear=${monthYear}`);
  let url = `http://localhost:3003/reports/expenseIncome?reportsType=${reportsType}`;
  if (year) {
    url += `&year=${year}`;
  }
  if (monthYear) {
    url += `&monthYear=${monthYear}`;
  }
  console.log(`Final URL: ${url}`);
  const response = await axios.get(url);
  console.log('ASYNC fetchReports response:', response.data);
  return response.data;
});



// Async thunk to fetchTagExpenseReports from the backend
export const fetchTagExpenseReports = createAsyncThunk('reports/fetchTagExpenseReports', async ({ reportsType, year, monthYear, transaction_tag }) => {
  console.log(`ASYNC fetchTagExpenseReports reportsType=${reportsType}&year=${year}&monthYear=${monthYear}`);
  let url = `http://localhost:3003/reports/expensebytags?reportsType=${reportsType}`;
  if (year) {
    url += `&year=${year}`;
  }
  if (monthYear) {
    url += `&monthYear=${monthYear}`;
  }
  if (transaction_tag) {
    url += `&transaction_tag=${transaction_tag}`
  }
  
  console.log(`Final URL: ${url}`);
  const response = await axios.get(url);
  console.log('ASYNC fetchTagExpenseReports response:', response.data);
  return response.data;
});


const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    incomeData: [],
    expenseData: [],
    amountData: [],
    tagExpenseData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.incomeData = action.payload.incomeData;
        state.expenseData = action.payload.expenseData;
        state.amountData = action.payload.amountData;
      })
      .addCase(fetchTagExpenseReports.fulfilled, (state, action) => {
        state.tagExpenseData = action.payload.expenseData;
      })
  },
});

export default reportsSlice.reducer;