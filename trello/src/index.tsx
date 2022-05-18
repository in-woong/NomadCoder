import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
