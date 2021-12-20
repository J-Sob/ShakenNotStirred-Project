import React from 'react'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom'


const LogOut = () => {

    useEffect(() => {
        sessionStorage.clear()
    }, [])

    return(
        <div classname="LogOut">
            Logout page
            <Navigate to="/homepage"/>
        </div>
    );
}

export default LogOut;