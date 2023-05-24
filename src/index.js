import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStylesWrapper from './GlobalStylesWrapper';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStylesWrapper>
  <React.StrictMode>
   
    <App />

  </React.StrictMode>
  </GlobalStylesWrapper>
);


