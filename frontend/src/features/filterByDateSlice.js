// features/itemsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching filtered items
export const FilteredTransactionsByDate = createAsyncThunk( "filterByDate/fetchFilteredItems", async (filter) => {
    const response = await axios.get(`http://localhost:3003/filterByDate/?filter=${filter}`);
    console.log("ASYNC filtered item ", filter);
    return response.data;
  }
);

const filterByDateSlice = createSlice({
  name: "filterByDate",
  initialState: {
    filteredTransactions: [],
    filter: "all",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      console.log("slice filter ", state.filter);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FilteredTransactionsByDate.fulfilled, (state, action) => {
      state.filteredTransactions = action.payload;
      console.log("slice filtered items", state.filteredTransactions);
    });
  },
});

export const { setFilter } = filterByDateSlice.actions;

export default filterByDateSlice.reducer;
