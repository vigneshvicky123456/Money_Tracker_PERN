import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks API requests

// FilteredTransactionsByDate
export const FilteredTransactionsByDate = createAsyncThunk( "filterByDate/fetchFilteredItems", async ({filter, transaction_tag, accountId}) => {
  console.log(`ASYNC FilteredTransactionsByDate/filterByDate?filter=${filter}&transaction_tag=${transaction_tag}`);
    let url = `http://localhost:3003/filterByDate?filter=${filter}`
    if (transaction_tag) {
      url += `&transaction_tag=${transaction_tag}`
    }
    if (accountId) {
      url += `&accountId=${''}`
    }
    console.log(`Final URL: ${url}`);
    const response = await axios.get(url);
    console.log('ASYNC FilteredTransactionsByDate response: ',response.data);
    
    return response.data;
  }
);

//&accountId=
const filterByDateSlice = createSlice({
  name: "filterByDate",
  initialState: {
    filteredTransactions: [],
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(FilteredTransactionsByDate.fulfilled, (state, action) => {
      state.filteredTransactions = action.payload;
      console.log("slice filtered items:", state.filteredTransactions);
    });
  },
});


export default filterByDateSlice.reducer;

