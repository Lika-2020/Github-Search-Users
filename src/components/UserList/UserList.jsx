import './UserList.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  sortByAscending,
  sortByDescending,
} from '../../store/slice/githubSlice';

import { getUserRepos } from '../../api/api';

function UserList() {
  const users = useSelector((state) => {
    const sortedUsers = [...state.github.users]; // Создаем копию массива users
    if (state.github.sort === 'ascending') {
      sortedUsers.sort((a, b) => a.public_repos - b.public_repos);
    } else if (state.github.sort === 'descending') {
      sortedUsers.sort((a, b) => b.public_repos - a.public_repos);
    }
    return sortedUsers;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    users.forEach((user) => {
      dispatch(getUserRepos(user.login));
    });
  }, [dispatch, users]);

  const handleSortAscending = () => {
    dispatch(sortByAscending());
  };

  const handleSortDescending = () => {
    dispatch(sortByDescending());
  };

  return (
    <div className="ul">
      <button type="button" onClick={handleSortAscending}>
        Sort Ascending
      </button>
      <button type="button" onClick={handleSortDescending}>
        Sort Descending
      </button>
      <ul>
        <div className="user-list">
          {users.map((user) => (
            <li key={user.id}>
              <div className="list">
                <div>
                  {user.avatar_url && (
                    <img src={user.avatar_url} alt={user.login} />
                  )}
                </div>
                <div>
                  <span>Логин: </span>
                  <span>{user.login}</span>
                </div>
                <div>
                  <span>Id: </span>
                  <span>{user.id}</span>
                </div>
                <div>
                  <span>Кол-во репозиториев: </span>
                  <span>{user.public_repos}</span>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default UserList;
