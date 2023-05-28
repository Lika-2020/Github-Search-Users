/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { searchUsers, getUserRepos } from '../../api/api';

export const githubSlice = createSlice({
  name: 'github',
  initialState: {
    users: [],
    status: 'idle',
    sort: null,
    error: null,
    filteredUsers: [],
    login: null,
    currentPage: 1,
    usersPerPage: 9,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        user.login.includes(action.payload)
      );
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(searchUsers.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(searchUsers.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.status = 'succeeded';
        state.users = action.payload;
        state.filteredUsers = action.payload.filter((user) =>
          user.login.includes(state.login)
        );
      } else {
        state.status = 'succeeded';
        state.users = [];
        state.filteredUsers = [];
      }
    })
    .addCase(searchUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })

      .addCase(getUserRepos.pending, (state) => {
        console.log('getUserRepos.pending');
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
      });
  },
});

export const {
  setUsers,
  setLogin,
  setFilteredUsers,
  sortByAscending,
  sortByDescending,
  setCurrentPage,
 
} = githubSlice.actions;

export const calculateTotalPages = (state) => {
  const { usersPerPage, users } = state;
  return Math.ceil(users.length / usersPerPage);
};

export default githubSlice.reducer;
