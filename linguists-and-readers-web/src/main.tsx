import './main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from './providers';
import RouterComponent from './pages/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterComponent />
    </Providers>
  </React.StrictMode>,
);
