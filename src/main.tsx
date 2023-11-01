import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Despesas from './pages/Despesas.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Despesas />,
      }
    ]
  }  
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
