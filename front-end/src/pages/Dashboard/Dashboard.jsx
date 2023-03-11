import './dashboard.scss'
import { AuthContext } from "../../context/Auth-context";
import React, { useContext } from "react";

function Dashboard(){
    const { role, jwt } = useContext(AuthContext);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>logged in details</h2>
            <p>
                <b>role:</b> {role} <br/>
                <b>jwttoken:</b> {jwt}
            </p>
        </div>
    )
}

export default Dashboard