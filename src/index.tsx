import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import "@fontsource/nunito/200.css";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";

import reportWebVitals from './reportWebVitals';
import { Routes } from './routes';
import { store } from './store';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
