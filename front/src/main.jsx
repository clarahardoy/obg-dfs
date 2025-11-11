import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { loguear } from './features/auth.slice.js';
import './i18n/index.js';
import App from './App.jsx';

const token = localStorage.getItem('token');
if (token) {
  const role = localStorage.getItem('role') || null;
  const membership = localStorage.getItem('membership') || null;
  const maxReadings = parseInt(localStorage.getItem('maxReadings') || '0', 10);
  store.dispatch(loguear({ token, role, membership, maxReadings }));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);