import React, { useEffect, useState } from "react";
import "./superAdminDashboard.scss";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import SystemAdminSidebar from "../../layout/sidebar/AdminSidebar";
import Navbar from "../../layout/navbar/Navbar";
import Overview from "./Overview/Overview";
import ViewHP from "./ViewHP/ViewHP";
import AddHP from "./AddHP/AddHP";

function SuperAdminDashboard() {
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
            <SystemAdminSidebar
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
                        <Route path="/" element={<Overview />} />
                        <Route path="/view" element={<ViewHP />} />
                        <Route path="/new" element={<AddHP />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default SuperAdminDashboard;