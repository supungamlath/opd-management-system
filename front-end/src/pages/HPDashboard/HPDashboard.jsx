import React, { useEffect, useState } from "react";
import "./hpdashboard.scss";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Navbar from "../../layout/navbar/Navbar";
import ProfessionalSidebar from "../../layout/sidebar/ProfessionalSidebar";
import Appointments from "./Appointments/Appointments";

function HPdashboard() {
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
    <div className="HPdashboard">
      <ProfessionalSidebar
        isSidebarActive={isSidebarActive}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={
          isSidebarActive
            ? "HPdashboard-container collapse"
            : "HPdashboard-container"
        }
      >
        <header>
          <Navbar isSidebarActive={isSidebarActive} />
        </header>

        <main className="HPdashboard-main">
          <Routes>
            <Route path="/" element={<Appointments />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default HPdashboard;
