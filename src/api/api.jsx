import { createAsyncThunk } from '@reduxjs/toolkit';

export const searchUsers = createAsyncThunk(
  'github/searchUsers',

  async (login) => {
    if (login === '') {
      return []; // Возвращаем пустой массив, если поле поиска пустое
    }

    const token = process.env.REACT_APP_GITHUB_TOKEN;

    const response = await fetch(
      `https://api.github.com/search/users?q=${login}&per_page=100`,

      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    const data = await response.json();
    const filteredUsers = data.items.filter((user) =>
      user.login.startsWith(login)
    );

    return filteredUsers;
  }
);

export const getUserRepos = createAsyncThunk(
  'repos/getUserRepos',

  async (login) => {
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const data = await response.json();
    const repos = data.public_repos;
    
    return { login, repos }; // Возвращаем объект с данными о логине и количестве репозиториев
  }
);
