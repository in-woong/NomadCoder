import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

function Router({ toggleDark, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Coins toggleDark={toggleDark} isDark={isDark} />}
        />
        <Route path='/:coinId/*' element={<Coin isDark={isDark} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
