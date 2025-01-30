import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks API requests

// FilteredTransactionsByDate
export const FilteredTransactionsByDate = createAsyncThunk( "filterByDate/fetchFilteredItems", async ({filter, transaction_tag, accountId}) => {
    let url = `http://localhost:3003/filterByDate?filter=${filter}`
    if (transaction_tag) {
      url += `&transaction_tag=${transaction_tag}`
    }
    if (accountId) {
      url += `&accountId=${accountId}`
    }
    const response = await axios.get(url);
    return response.data;
  }
);

const filterByDateSlice = createSlice({
  name: "filterByDate",
  initialState: {
    filteredTransactions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FilteredTransactionsByDate.fulfilled, (state, action) => {
      state.filteredTransactions = action.payload;
    });
  },
});


export default filterByDateSlice.reducer;

