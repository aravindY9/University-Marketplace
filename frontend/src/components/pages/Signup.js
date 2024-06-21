import React, {useRef, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {Link, Navigate} from "react-router-dom"
import {useNavigate} from 'react-router-dom';


const Signup = () => {
    let navigate = useNavigate();
    const {currentUser, signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        const name = e.target[0].value;
        const username = e.target[1].value;
        const email = e.target[2].value;
        const password = e.target[3].value;
        setError("")
        setLoading(true)
        signup({
            name: name,
            username: username,
            email: email,
            password: password
        }).then((cred) => {
            console.log(cred)
            navigate("/dashboard")
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        });
    }

    return (
        <>{currentUser ? <Navigate to={"/dashboard"}/> :


            <div className="login-page">
                <div className="form">
                    <form onSubmit={handleSubmit} className={"login-form"}>
                        <input type="text" placeholder="Full Name"/>
                        <input type="text" placeholder="Username"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <label><span> </span><input type="submit" value="Register"/></label>
                        <p className="message">Already registered? <a href="/login">Login here</a></p>
                    </form>
                </div>
            </div>}
        </>);
}
export default Signup;

