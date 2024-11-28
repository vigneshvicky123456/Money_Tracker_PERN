import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from '../features/currenciesSlice';
import accountReducer from '../features/accountsSlice';
import newTransactionReducer from '../features/newTransactionsSlice';
import filterByDateReducer from '../features/filterByDateSlice';

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        account: accountReducer,
        newTransaction: newTransactionReducer,
        filterByDate: filterByDateReducer,
    },
});
