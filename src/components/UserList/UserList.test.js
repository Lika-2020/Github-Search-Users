/* eslint-disable no-undef */

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  useSelector as mockUseSelector,
  useDispatch as mockUseDispatch,
} from 'react-redux';

import UserList from './UserList';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

test('Pаскрывает информацию о пользователе при нажатии на avatar_url', () => {
  const users = [
    {
      id: 1,
      avatar_url: 'avatar1.jpg',
      login: 'user1',
      public_repos: '10',
    },
  ];

  const dispatch = jest.fn();
  mockUseSelector.mockImplementation((selector) =>
    selector({
      github: {
        isSearching: false,
        users,
        currentPage: 1,
        usersPerPage: 10,
        sort: null,
      },
    })
  );
  mockUseDispatch.mockReturnValue(dispatch);

  function ErrorBoundary({ children }) {
    // Error boundary component
    return <div>{children}</div>;
  }

  render(
    <ErrorBoundary>
      <UserList />
    </ErrorBoundary>
  );

  const avatarImage = screen.getByAltText('user1');
  fireEvent.click(avatarImage);

  // Assert expanded user details
  expect(screen.getByText(/Логин:/)).toBeInTheDocument();
  expect(screen.getByText('user1')).toBeInTheDocument();
  expect(screen.getByText(/Id:/)).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: /User ID/i })).toBeInTheDocument();
  expect(screen.getByText(/Кол-во репозиториев:/)).toBeInTheDocument();
  expect(
    screen.getByRole('cell', { name: /Repository Count/i })
  ).toBeInTheDocument();
});
