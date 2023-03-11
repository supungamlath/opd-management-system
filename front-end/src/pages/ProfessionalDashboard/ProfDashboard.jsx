import React, { useEffect, useState } from "react";
import "./userdashboard.scss";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Sidebar from "../../layout/sidebar/UserSidebar";
import ProfessionalSidebar from "../../layout/sidebar/ProfessionalSidebar";
import Navbar from "../../layout/navbar/Navbar";
import Appointments from "./Appointments/Appointments";
import TodayAppointments from "./TodayAppointments/TodayAppointments";


function ProfDashboard() {
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
      <ProfessionalSidebar
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
            <Route path="/today" element={<TodayAppointments />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default ProfDashboard;
