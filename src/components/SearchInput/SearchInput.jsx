import './style.css';
import { useDispatch } from 'react-redux';
import {searchUsers} from '../../api/api';
import { setLogin, setFilteredUsers } from '../../store/slice/githubSlice';

function SearchInput() {
  const dispatch = useDispatch();

  const handleInputChange = async (event) => {
    const { value } = event.target;
    dispatch(setLogin(value));

    try {
      const response = await dispatch(searchUsers(value));
      const filteredUsers = response.payload.filter(
        (user) => user.login === value
      );
      console.log(filteredUsers);
      dispatch(setFilteredUsers(filteredUsers));
    } catch (error) {
      console.log('Error:', error);
    }
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
