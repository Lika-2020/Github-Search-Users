import { configureStore } from '@reduxjs/toolkit';
import  githubSlice  from './slice/githubSlice';

const store = configureStore({
  reducer: {
    github: githubSlice,
  },
});

export default store;
