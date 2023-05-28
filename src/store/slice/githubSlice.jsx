/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { searchUsers, getUserRepos } from '../../api/api';

const githubSlice = createSlice({
  name: 'github',
  initialState: {
    users: [],
    status: 'idle',
    sort: null,
    error: null,
    filteredUsers: [],
    login: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    sortByAscending: (state) => {
      state.users = [...state.users].sort(
        (a, b) => a.public_repos - b.public_repos
      );
      state.sort = 'ascending';
    },
    sortByDescending: (state) => {
      state.users = [...state.users].sort(
        (a, b) => b.public_repos - a.public_repos
      );
      state.sort = 'descending';
    },
  },
  extraReducers: (builder) => {
    builder
    // eslint-disable-next-line no-unused-vars
   
   
     
   
    // eslint-disable-next-line no-unused-vars
   
      .addCase(searchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // eslint-disable-next-line no-unused-vars
      .addCase(getUserRepos.pending, (state) => {
        console.log('getUserRepos.pending');
        // Дополнительные действия при начале запроса
      })
      .addCase(getUserRepos.fulfilled, (state, action) => {
        const { login, repos } = action.payload;
        console.log('getUserRepos.fulfilled');
        const user = state.users.find((users) => users.login === login);
        if (user) {
          user.public_repos = repos;
        }
      })
      .addCase(getUserRepos.rejected, (state, action) => {
        console.log('getUserRepos.rejected');
        // Дополнительные действия при ошибке запроса
      })
  },
});

export const {
  setUsers,
  setLogin,
  setFilteredUsers,
  sortByAscending,
  sortByDescending,
} = githubSlice.actions;

export default githubSlice.reducer;
