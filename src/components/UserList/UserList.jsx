import './UserList.css';
import './_tablet.css';
import './_mobile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  setCurrentPage,
  calculateTotalPages,
  setSortType,
} from '../../store/slice/githubSlice';

import { getUserRepos, sortUsers } from '../../api/api';

function UserList() {
  const [expandedUser, setExpandedUser] = useState(null);
  const [activeSort, setActiveSort] = useState(null);

  const isSearching = useSelector((state) => state.github.isSearching);
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.github.currentPage);
  const totalPages = useSelector((state) => calculateTotalPages(state.github));
  const totalUsers = useSelector((state) => state.github.users.length);
  const login = useSelector((state) => state.github.login);
  const users = useSelector((state) => {
    const { usersPerPage } = state.github;
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const sortedUsers = [...state.github.users];

    return sortedUsers.slice(startIndex, endIndex);
  });

  useEffect(() => {
    users.forEach((user) => {
      dispatch(getUserRepos(user.login));
    });
  }, [dispatch, users]);

  // Эти действия обновляют состояние сортировки пользователей и выполняют сортировку.
  // Активная сортировка сохраняется в состоянии activeSort.

  const handleSort = ({ field, order }) => {
    dispatch(setSortType(field, order));
    dispatch(sortUsers({ login, order, currentPage }));
    setActiveSort({ order });
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getButtonClass = (page) =>
    page === currentPage ? 'active pagination-button' : 'pagination-button';

  const getButtonSortClass = (order) =>
    activeSort && activeSort.order === order
      ? 'active button-sort'
      : 'button-sort';

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
            className={getButtonSortClass('asc')}
            type="button"
            onClick={() => handleSort({ field: 'repos', order: 'asc' })}
          >
            Sort Ascending
          </button>
          <button
            className={getButtonSortClass('desc')}
            type="button"
            onClick={() => handleSort({ field: 'repos', order: 'desc' })}
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
