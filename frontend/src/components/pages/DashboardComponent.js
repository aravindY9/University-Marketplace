import {useAuth} from "../../context/AuthContext"
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import AdminComponent from "./admin/AdminComponent";
import StudentComponent from "./student/StudentComponent";

export default function DashboardComponent() {
    const {currentUser} = useAuth()
    const navigation = useNavigate()

    return (<>
            <div className="min-vh-100">
            {currentUser.role==="admin"?<AdminComponent/>:<StudentComponent/>}
            </div>
        </>
    );
}