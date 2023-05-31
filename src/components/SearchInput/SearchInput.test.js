/* eslint-disable no-undef */

import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import SearchInput from './SearchInput';
import { setLogin } from '../../store/slice/githubSlice';

const mockStore = configureStore([]);

describe('SearchInput', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('Отправляет действие setLogin при изменении ввода', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    const input = getByPlaceholderText('Введите логин пользователя');
    act(() => {
      fireEvent.change(input, { target: { value: 'testuser' } });
    });

    const actions = store.getActions();
    expect(actions[0]).toEqual(setLogin('testuser'));
  });

  test('Отправляет setFilteredUsers после задержки 300 мс', async () => {
    jest.useFakeTimers();

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    const input = getByPlaceholderText('Введите логин пользователя');
    act(() => {
      fireEvent.change(input, { target: { value: 'testuser' } });
    });

    act(() => {
      jest.runAllTimers();
    });

    const actions = store.getActions();
    expect(actions[0]).toEqual(setLogin('testuser'));
  });
});
