import './style.css';
import { useDispatch } from 'react-redux';

import { searchUsers } from '../../api/api';
import { setLogin, setFilteredUsers } from '../../store/slice/githubSlice';

function SearchInput() {
  const dispatch = useDispatch();

  let searchTimeout;

  const handleInputChange = (event) => {
    const { value } = event.target;
    dispatch(setLogin(value));

    clearTimeout(searchTimeout); // Clear the previous timeout

    searchTimeout = setTimeout(async () => {
      try {
        const response = await dispatch(searchUsers(value));
        const filteredUsers = response.payload.filter((user) =>
          user.login.includes(value)
        );
        dispatch(setFilteredUsers(filteredUsers));
      } catch (error) {
        console.log('Error:', error);
      }
    }, 300);
  };

  return (
    <div className="search-input">
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
      </div>
    </div>
  );
}

export default SearchInput;
