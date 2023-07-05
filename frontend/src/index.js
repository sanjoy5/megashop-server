import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/bootstrap/bootstrap.min2.css'
import router from './router';
import { Provider } from 'react-redux'
import {
  RouterProvider
} from "react-router-dom";
import { store } from './store';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
