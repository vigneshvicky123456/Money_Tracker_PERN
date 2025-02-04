import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Thunks API requests

const API_URL = "https://money-tracker-pern.onrender.com";

// Async thunk to fetch reports from the backend
export const fetchReports = createAsyncThunk('reports/fetchReports', async ({ reportsType, year, monthYear, transaction_tag, accountId }) => {
  let url = `${API_URL}/reports/expenseIncome?reportsType=${reportsType}`;
  if (year) {
    url += `&year=${year}`;
  }
  if (monthYear) {
    url += `&monthYear=${monthYear}`;
  }
  if (transaction_tag) {
    url += `&transaction_tag=${transaction_tag}`
  }
  if (accountId) {
    url += `&accountId=${accountId}`
  }

  const response = await axios.get(url);
  return response.data;
});

// Async thunk to fetchTagExpenseReports from the backend
export const fetchTagExpenseReports = createAsyncThunk('reports/fetchTagExpenseReports', async ({ reportsType, year, monthYear, transaction_tag, accountId }) => {
  let url = `${API_URL}/reports/expensebytags?reportsType=${reportsType}`;
  if (year) {
    url += `&year=${year}`;
  }
  if (monthYear) {
    url += `&monthYear=${monthYear}`;
  }
  if (transaction_tag) {
    url += `&transaction_tag=${transaction_tag}`
  }
  if (accountId) {
    url += `&accountId=${accountId}`
  }
  
  const response = await axios.get(url);
  return response.data;
});

// Async thunk to NetIncome reports from the backend
export const fetchNetIncomeReports = createAsyncThunk('reports/fetchNetIncomeReports', async ({ reportsType, year, monthYear, transaction_tag, accountId }) => {
  let url = `${API_URL}/reports/netIncome?reportsType=${reportsType}`;
  if (year) {
    url += `&year=${year}`;
  }
  if (monthYear) {
    url += `&monthYear=${monthYear}`;
  }
  if (transaction_tag) {
    url += `&transaction_tag=${transaction_tag}`
  }
  if (accountId) {
    url += `&accountId=${accountId}`
  }

  const response = await axios.get(url);
  return response.data;
});

// Async thunk to NetWorth reports from the backend
export const fetchNetWorthReports = createAsyncThunk('reports/fetchNetWorthReports', async ({ reportsType, year, monthYear, transaction_tag, accountId }) => {
  let url = `${API_URL}/reports/netWorth?reportsType=${reportsType}`;
  if (year) {
    url += `&year=${year}`;
  }
  if (monthYear) {
    url += `&monthYear=${monthYear}`;
  }
  if (transaction_tag) {
    url += `&transaction_tag=${transaction_tag}`
  }
  if (accountId) {
    url += `&accountId=${accountId}`
  }

  const response = await axios.get(url);
  return response.data;
});


const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    incomeData: [],
    expenseData: [],
    amountData: [],
    tagAmountData: [],
    tagExpenseData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.incomeData = action.payload.incomeData;
        state.expenseData = action.payload.expenseData;
        state.amountData = action.payload.amountData;
        state.tagAmountData = action.payload.tagAmountData;
      })
      .addCase(fetchTagExpenseReports.fulfilled, (state, action) => {
        state.tagExpenseData = action.payload.expenseData;
      })
      .addCase(fetchNetIncomeReports.fulfilled, (state, action) => {
        state.incomeData = action.payload.incomeData;
        state.amountData = action.payload.amountData;
      })
      .addCase(fetchNetWorthReports.fulfilled, (state, action) => {
        state.incomeData = action.payload.incomeData;
      })
  },
});

export default reportsSlice.reducer;