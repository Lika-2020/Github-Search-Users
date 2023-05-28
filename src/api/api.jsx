import { createAsyncThunk } from '@reduxjs/toolkit';

export const searchUsers = createAsyncThunk(
  'github/searchUsers',
  async (login) => {
    if (login === '') {
      return []; // Возвращаем пустой массив, если поле поиска пустое
    }

    const response = await fetch(
      `https://api.github.com/search/users?q=${login}`
    );

    const data = await response.json();
    const filteredUsers = data.items.filter((user) =>
      user.login.includes(login)
    );
    console.log(filteredUsers);
    return filteredUsers;
  }
);

export const getUserRepos = createAsyncThunk(
  'repos/getUserRepos',
  async (login) => {
    const response = await fetch(`https://api.github.com/users/${login}`);

    const data = await response.json();
    const repos = data.public_repos;
    console.log(repos);
    return { login, repos }; // Возвращаем объект с данными о логине и количестве репозиториев
  }
);
