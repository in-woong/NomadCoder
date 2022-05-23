import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { RecoilRoot } from 'recoil';
import { darkTheme } from './theme';
import { ThemeProvider } from 'styled-components';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
