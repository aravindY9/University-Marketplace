import React, {useContext, useState, useEffect} from "react"
import axios from "axios";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getCurrentUser().then(() => {
            setLoading(false)
        })
    }, [1])

    function signup(user) {
        return axios({
            method: "POST",
            data: user,
            withCredentials: true,
            url: "http://localhost:4000/register",
        })
    }

    function login(username, password) {
        return axios({
            method: "POST",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:4000/login",
        })
    }

    async function getCurrentUser() {
        return new Promise((resolve, reject) => {
            axios({
                method: "get",
                withCredentials: true,
                url: "http://localhost:4000/user",
            }).then((res) => {
                console.log(res)
                if (!res.data.username){
                    setCurrentUser(undefined)
                }else{
                    setCurrentUser(res.data)
                }
                resolve()
            }).catch(err => {
                reject(err)
            })
        })

    }


    function logout() {
        axios({
            method: "post",
            withCredentials: true,
            url: "http://localhost:4000/logout",
        }).then((res) => {
            setCurrentUser(res.data)
        })
    }

    function changePassword(currentPassword, newPassword) {
        const url = "http://localhost:4000/change-password";
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    withCredentials: true,
                    body: JSON.stringify({
                        currentPassword: currentPassword,
                        newPassword: newPassword
                    })
                });
                const data = await response.json();
                if (!response.ok) {
                    reject(new Error(data.message || 'Failed to change password.'));
                } else {
                    resolve(data);
                }
            } catch (error) {
                reject(new Error('Network error or unexpected issue occurred.'));
            }
        });
    }


    const value = {
        currentUser,
        setCurrentUser,
        signup,
        login,
        getCurrentUser,
        logout,
        changePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}