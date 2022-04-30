import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
