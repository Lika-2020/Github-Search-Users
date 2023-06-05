/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { searchUsers, getUserRepos, sortUsers } from '../../api/api';

const githubSlice = createSlice({
  name: 'github',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    filteredUsers: [],
    isSearching: false,
    login: null,
    sortType: {
      field: 'repos', // поле для сортировки ('repos' для количества репозиториев)
      order: 'desc', // порядок сортировки ('desc' для убывающего, 'asc' для возрастающего)
    },
    currentPage: 1,
    usersPerPage: 9,
  },

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setLogin: (state, action) => {
      state.login = action.payload;
      if (action.payload === '') {
        state.login = null; // Очистка login при пустом значении
      }
      state.filteredUsers = state.users.filter(
        (user) => user.login === action.payload
      );
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.status = 'succeeded';
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

      .addCase(sortUsers.pending, (state) => {
        state.status = 'succeeded';
      })

      .addCase(sortUsers.fulfilled, (state, action) => {
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
      .addCase(sortUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getUserRepos.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserRepos.fulfilled, (state, action) => {
        const { login, repos } = action.payload;
        const user = state.users.find((users) => users.login === login);
        if (user) {
          user.public_repos = repos;
        }
      })
      .addCase(getUserRepos.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  setUsers,
  setLogin,
  setFilteredUsers,
  setCurrentPage,
  setIsSearching,
} = githubSlice.actions;

export const calculateTotalPages = (state) => {
  const { usersPerPage, users } = state;
  return Math.ceil(users.length / usersPerPage);
};

export const setSortType = (field, order) => ({
  type: 'SET_SORT_TYPE',
  payload: { field, order },
});

export default githubSlice.reducer;
