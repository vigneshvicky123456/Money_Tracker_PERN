// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from '../features/currenciesSlice';
import accountReducer from '../features/accountsSlice';

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        account: accountReducer,
    },
});
