import "./App.scss";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginLanding from "./pages/LoginLanding/LoginLanding";
import { AuthContext } from "./context/Auth-context";
import SuperAdminDashboard from "./pages/SuperAdminDashboard/SuperAdminDashboard";
import UserDashboard from "./pages/PatientDashboard/UserDashboard";
import ProfDashboard from "./pages/ProfessionalDashboard/ProfDashboard";


function App() {
  const { role, jwt } = useContext(AuthContext);

  return (
    <div className="App">
      {jwt ? (
        (role === "System_Admin" || role === "Professional") ? (
          (role === "System_Admin") ?
            (
              <Routes>
                <Route path="/superadmin/*" element={<SuperAdminDashboard />} />
                <Route path="*" element={<Navigate to="/superadmin" replace />} />
              </Routes>
            ) :
            (
              <Routes>
                <Route path="/profdashboard/*" element={<ProfDashboard />} />
                <Route path="*" element={<Navigate to="/profdashboard" replace />} />
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
