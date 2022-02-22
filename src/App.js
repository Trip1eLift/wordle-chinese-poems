import React from 'react';
import TangleApp from './tangle-components/TangleApp';
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/tangle" element={<TangleApp />} />

      <Route path="/" element={<Navigate to="/tangle" />} />
    </Routes>
  );
}

export default App;
