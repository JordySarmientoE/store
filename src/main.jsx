import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import '../public/css/tailwind.css';
import { ControllerProvider } from './context';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <ControllerProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ControllerProvider>
    </ThemeProvider>
  </BrowserRouter>
);
