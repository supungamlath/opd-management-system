import "./App.scss";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginLanding from "./pages/LoginLanding/LoginLanding";
import { AuthContext } from "./context/Auth-context";
import SuperAdminDashboard from "./pages/SuperAdminDashboard/SuperAdminDashboard";
import HPDashboard from "./pages/HPDashboard/HPDashboard";
import UserDashboard from "./pages/PatientDashboard/UserDashboard";



function App() {
  const { role, jwt } = useContext(AuthContext);

  return (
    <div className="App">
      {jwt ? (
        (role === "System_Admin" || role === "Healthcare Professional") ? (
          (role === "System_Admin") ?
            (
              <Routes>
                <Route path="/superadmin/*" element={<SuperAdminDashboard />} />
                <Route path="*" element={<Navigate to="/superadmin" replace />} />
              </Routes>
            ) :
            (
              <Routes>
                <Route path="/hpdashboard/*" element={<HPDashboard />} />
                <Route path="*" element={<Navigate to="/hpdashboard" replace />} />
              </Routes>
            )

        ) : (
          <Routes>
            <Route path="/patientdashboard/*" element={<UserDashboard />} />
            <Route
              path="*"
              element={<Navigate to="/patientdashboard" replace />}
            />
          </Routes>
        )
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
