import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { FinanceApp } from './FinanceApp';
import './styles.css';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <FinanceApp />
    </React.StrictMode>
  </Provider>
)