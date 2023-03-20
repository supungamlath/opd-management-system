import "./App.scss";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./context/Auth-context";
import SuperAdminDashboard from "./pages/Admin/SuperAdminDashboard";
import ProfessionalDashboard from "./pages/Professional/ProfessionalDashboard";
import UserDashboard from "./pages/User/UserDashboard";
import Homepage from "./pages/Home/Homepage";


function App() {
  const { role, jwt } = useContext(AuthContext);

  return (
    <div className="App">
      {jwt ? (
        (role === "System_Admin" || role === "Professional") ? (
          (role === "System_Admin") ?
            (
              <Routes>
                <Route path="/admin/*" element={<SuperAdminDashboard />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            ) :
            (
              <Routes>
                <Route path="/professional/*" element={<ProfessionalDashboard />} />
                <Route path="*" element={<Navigate to="/professional" replace />} />
              </Routes>
            )

        ) : (
          <Routes>
            <Route path="/patient/*" element={<UserDashboard />} />
            <Route
              path="*"
              element={<Navigate to="/patient" replace />}
            />
          </Routes>
        )
      ) : (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      )}
    </div>
  );
}

export default App;
