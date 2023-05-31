import './style.css';
import './_mobile.css'

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { searchUsers } from '../../api/api';
import {
  setLogin,
  setFilteredUsers,
  setIsSearching,
} from '../../store/slice/githubSlice';
import ErrorMessage from '../Error/ErrorMessage'; 
import setErrorLocalization from '../Error/ErrorLocalization'; 

function SearchInput() {
  const [localizedError, setLocalizedError] = useState(null);

  const dispatch = useDispatch();

  let searchTimeout;

  const handleInputChange = (event) => {
    const { value } = event.target;
    dispatch(setLogin(value));

    clearTimeout(searchTimeout); 

    if (value.trim() === '') {
      dispatch(setFilteredUsers([])); 
    }

    dispatch(setIsSearching(true)); 

    searchTimeout = setTimeout(async () => {
      try {
        const response = await dispatch(searchUsers(value));
        const filteredUsers = response.payload.filter((user) =>
          user.login.startsWith(value)
        );

        dispatch(setFilteredUsers(filteredUsers));

        if (filteredUsers.length === 0) {
          dispatch(setIsSearching(false)); 
        }
      } catch (err) {
        
        const errorMessage = setErrorLocalization(err); // Функция setErrorLocalization локализует ошибку на русский язык
        setLocalizedError(errorMessage);
      }
    }, 300);
  };

  return (
    <div id="search-input" className="search-input">
      <div className="title">
        <h1>Github Search Users</h1>
      </div>
      <div className="input-block">
        <input
          className="input"
          type="search"
          name="search"
          maxLength="48"
          placeholder="Введите логин пользователя"
          onChange={handleInputChange}
        />
        {localizedError && (
          <ErrorMessage message={localizedError} /> 
        )}
      </div>
    </div>
  );
}

export default SearchInput;
