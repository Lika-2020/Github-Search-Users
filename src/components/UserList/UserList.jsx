import './UserList.css';
import './_tablet.css';
import './_mobile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  sortByAscending,
  sortByDescending,
  setCurrentPage,
  calculateTotalPages,
} from '../../store/slice/githubSlice';

import { getUserRepos } from '../../api/api';

function UserList() {
  const [expandedUser, setExpandedUser] = useState(null);
  const [activeSort, setActiveSort] = useState(null);

  const isSearching = useSelector((state) => state.github.isSearching);
  const dispatch = useDispatch();

  const users = useSelector((state) => {
    const { currentPage, usersPerPage } = state.github;
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const sortedUsers = [...state.github.users];
    if (state.github.sort === 'ascending') {
      sortByAscending();
    } else if (state.github.sort === 'descending') {
      sortByDescending();
    }

    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

    return paginatedUsers;
  });

  useEffect(() => {
    users.forEach((user) => {
      dispatch(getUserRepos(user.login));
    });
  }, [dispatch, users]);

  const currentPage = useSelector((state) => state.github.currentPage);
  const totalPages = useSelector((state) => calculateTotalPages(state.github));
  const totalUsers = useSelector((state) => state.github.users.length);

  const handleSortAscending = () => {
    dispatch(sortByAscending());
    setActiveSort('ascending');
  };

  const handleSortDescending = () => {
    dispatch(sortByDescending());
    setActiveSort('descending');
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getButtonClass = (page) =>
    page === currentPage ? 'active your-class-name' : 'your-class-name';

  const getButtonSortClass = (sortType) =>
    activeSort === sortType ? 'active-sort button-sort' : 'button-sort';

  const toggleUserDetails = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  return (
    <div className="ul">
      {isSearching && totalUsers === 0 && (
        <div className="title-users-search">Пользователь не найден</div>
      )}

      {totalUsers > 0 && (
        <div className="button">
          <button
            className={getButtonSortClass('ascending')}
            type="button"
            onClick={handleSortAscending}
          >
            Sort Ascending
          </button>
          <button
            className={getButtonSortClass('descending')}
            type="button"
            onClick={handleSortDescending}
          >
            Sort Descending
          </button>
        </div>
      )}

      {totalUsers > 0 && (
        <div className="title-users-search">
          Найдено {totalUsers} пользователей
        </div>
      )}

      <ul>
        <div className="user-list">
          {users.map((user) => (
            <li key={user.id}>
              <div className="list">
                <div
                  role="presentation"
                  onClick={() => toggleUserDetails(user.id)}
                >
                  {user.avatar_url && (
                    <img src={user.avatar_url} alt={user.login} />
                  )}
                </div>
                {expandedUser === user.id && (
                  <div>
                    
                    <div>
                      <span>Логин: </span>
                      <span>{user.login}</span>
                    </div>
                    <div>
                      <span role="cell" aria-label="User ID">
                        Id:
                      </span>
                      <span>{user.id}</span>
                    </div>

                    <div>
                      <a
                        href={`https://github.com/${user.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Профиль GitHub
                      </a>
                    </div>

                    <div>
                      <span role="cell" aria-label="Repository Count">
                        Кол-во репозиториев:
                      </span>
                      <span>{user.public_repos}</span>
                    </div>
                  </div>
                )}
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
