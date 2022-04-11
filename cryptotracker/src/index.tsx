import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

import App from './App';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
