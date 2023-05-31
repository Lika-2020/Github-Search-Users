import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import GlobalStylesWrapper from './GlobalStylesWrapper';
import store from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStylesWrapper>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GlobalStylesWrapper>
  </Provider>
);
