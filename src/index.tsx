import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import theme from './theme';
import { ToastContainer } from './components/Toast';

const container = document.getElementById('root');
const root = createRoot(container!);
const app = (
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
          <ToastContainer />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
