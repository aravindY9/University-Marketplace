import React, {Component, useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

export default function ProtectedRoute() {
    const {currentUser, getCurrentUser} = useAuth()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getCurrentUser().then(() => {
            setLoading(false)
        }).catch((err) => {
            console.error(err)
            setLoading(false)
        })
    }, [])
    return loading ? <> Connecting to server</>: currentUser ? <Outlet/> : <Navigate to="/login"/>
};