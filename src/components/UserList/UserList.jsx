import './UserList.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  sortByAscending,
  sortByDescending,
  setCurrentPage,
  calculateTotalPages,
} from '../../store/slice/githubSlice';

import { getUserRepos } from '../../api/api';

function UserList() {
  const users = useSelector((state) => {
    const { currentPage, usersPerPage } = state.github;
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const sortedUsers = [...state.github.users];
    if (state.github.sort === 'ascending') {
      sortedUsers.sort((a, b) => a.public_repos - b.public_repos);
    } else if (state.github.sort === 'descending') {
      sortedUsers.sort((a, b) => b.public_repos - a.public_repos);
    }

    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

    return paginatedUsers;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    users.forEach((user) => {
      dispatch(getUserRepos(user.login));
    });
  }, [dispatch, users]);

  const currentPage = useSelector((state) => state.github.currentPage);
  const totalPages = useSelector((state) => calculateTotalPages(state.github));

  const handleSortAscending = () => {
    dispatch(sortByAscending());
  };

  const handleSortDescending = () => {
    dispatch(sortByDescending());
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getButtonClass = (page) =>
    page === currentPage ? 'active your-class-name' : 'your-class-name';

  return (
    <div className="ul">
      <button className='button' type="button" onClick={handleSortAscending}>
        Sort Ascending
      </button>
      <button className='button' type="button" onClick={handleSortDescending}>
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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              type="submit"
              key={page}
              onClick={() => handlePageChange(page)}
              className={getButtonClass(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default UserList;
