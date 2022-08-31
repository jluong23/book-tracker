import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {TasksContextProvider} from './context/TasksContext';
import { AuthContextProvider } from './context/AuthContext';
import { ModalContextProvider } from './context/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
        <TasksContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </TasksContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);

