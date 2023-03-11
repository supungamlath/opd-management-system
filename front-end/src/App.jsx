import "./App.scss";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginLanding from "./pages/Login/LoginLanding";
import Test from "./components/test/Test";
import { AuthContext } from "./context/Auth-context";


function App() {
  const { role, jwt } = useContext(AuthContext);

  return (
    <div className="App">
      {jwt ? (
        <Test/>
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
