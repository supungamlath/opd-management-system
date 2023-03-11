import './dashboard.scss'
import { AuthContext } from "../../context/Auth-context";
import React, { useContext } from "react";

function Dashboard(){
    const { role, jwt } = useContext(AuthContext);

    function signOut() {    
        localStorage.removeItem('jwt')
        setLocalStorage('auth', {})
        setAuth({})
        popAlert(`See you soon`)
        navigate('/')
        setTimeout(()=> window.location.reload(), 1200)
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>logged in details</h2>
            <p>
                <b>role:</b> {role} <br/>
                <b>jwttoken:</b> {jwt}
            </p>
            {/* add a button to clear jwt token */}
            <button onClick={signOut}>Sign Out</button>

        </div>
    )
}

export default Dashboard