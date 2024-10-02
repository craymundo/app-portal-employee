// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');


if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
