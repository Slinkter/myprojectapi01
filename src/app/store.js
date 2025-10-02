import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    users: usersReducer,
  },
});
