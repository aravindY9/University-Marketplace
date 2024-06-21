import React, {useRef, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {Link, Navigate} from "react-router-dom"
import {useNavigate} from 'react-router-dom';

function ForgotPasswordComponent() {
    let navigate = useNavigate();
    const {currentUser} = useAuth()
    const {login} = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        const email = e.target[0].value;

    }

    return (
        <>{currentUser ? <Navigate to={"/dashboard"}/> :
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter your Email"/>
                        <div className="button-container">
                            <input type="submit" value="Recover Password"/>
                        </div>
                    </form>
                </div>
            </div>
        }
        </>
    );
}


export default ForgotPasswordComponent;
