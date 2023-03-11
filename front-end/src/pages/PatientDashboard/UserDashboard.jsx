import React, { useEffect, useState } from "react";
import "./userdashboard.scss";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Sidebar from "../../layout/sidebar/UserSidebar";
import Navbar from "../../layout/navbar/Navbar";
import Appointments from "./Appointments/Appointments";
import Reports from "./Reports/Reports";
import NewAppointment from "../NewAppointment/NewAppointment";


function UserDashboard() {
  // control the responsive sidebar
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  // toggle sidebar
  function toggleSidebar() {
    setIsSidebarActive((prev) => !prev);
  }

  // declare media queries
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  // auto detect media queries
  useEffect(() => {
    if (isSmallScreen) {
      setIsSidebarActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="userdashboard">
      <Sidebar
        isSidebarActive={isSidebarActive}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={
          isSidebarActive
            ? "userdashboard-container collapse"
            : "userdashboard-container"
        }
      >
        <header>
          <Navbar isSidebarActive={isSidebarActive} />
        </header>

        <main className="userdashboard-main">
          <Routes>
            <Route path="/" element={<Appointments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/newappointment" element={<NewAppointment />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
