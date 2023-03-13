import React, {useLayoutEffect} from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import { Index } from './views/Index';
import './App.css';

function App() {

  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return (
      <Routes>
        <Route path="/" element={<Index/>} />
      </Routes>
  );
}

export default App;
