import React, {useRef, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {Link, Navigate} from "react-router-dom"
import {useNavigate} from 'react-router-dom';

function LoginComponent() {
    let navigate = useNavigate();
    const usernameRef = useRef()
    const passwordRef = useRef()
    const {currentUser, setCurrentUser} = useAuth()
    const {login} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        console.log(e.target)


        setError("")
        setLoading(true)
        login(email, password).then((res) => {
            console.log(res.data)
            setCurrentUser(res.data)
            navigate("/dashboard")
        }).catch((err) => {console.log(err) 
            alert('Incorrect Username/Password')})
        setLoading(false)
    }

    return (
        <>{currentUser ? <Navigate to={"/dashboard"}/> :
            <div>
                <div className="login-page">
                    <div className="form">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Username"/>
                            <input type="password" placeholder="Password"/>
                            <label><span> </span><input type="submit" value="Student Login"/></label>
                            <p className="message">Not registered? <a href="/Register">Create an account</a></p>
                        </form>
                    </div>
                </div>
            </div>
        }
        </>
    );
}


export default LoginComponent;
