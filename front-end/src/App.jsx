import "./App.scss";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginLanding from "./pages/LoginLanding/LoginLanding";
import Dashboard from "./pages/Dashboard/Dashboard";
import Test from "./components/test/Test";
import { AuthContext } from "./context/Auth-context";


function App() {
  const { role, jwt } = useContext(AuthContext);

  return (
    <div className="App">
      {jwt ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginLanding />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
      )}
    </div>
  );
}

export default App;
