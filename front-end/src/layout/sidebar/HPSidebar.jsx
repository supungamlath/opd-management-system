import "./sidebar.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import AddBoxIcon from '@mui/icons-material/AddBox';
// import TransformOutlinedIcon from "@mui/icons-material/TransformOutlined";
// import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { AuthContext } from "../../context/Auth-context";

function HPSidebar(props) {
    // import signout fnc form auth context
    const { signOut } = useContext(AuthContext);

    // destracture props
    const { isSidebarActive, toggleSidebar } = props;

    return (
        <div className={isSidebarActive ? "sidebar collapse" : "sidebar"}>
            <div className="top" onClick={toggleSidebar}>
                <LocalHospitalIcon className="icon" />

                {!isSidebarActive && <p className="logo">KernelPanic OPD</p>}
            </div>

            <div className="center">
                <ul>
                    <Link to={"/"}>
                        <li>
                            <PeopleIcon className="icon" />
                            {!isSidebarActive && <p>Today's Appointments</p>}
                        </li>
                    </Link>


                    <li onClick={signOut}>
                        <ExitToAppOutlinedIcon className="icon" />
                        {!isSidebarActive && <p>Sign Out</p>}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HPSidebar;