import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useState} from "react";

export default function NavBar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const navigate = useNavigate();
    const {currentUser, logout} = useAuth();
    const [activeLink, setActiveLink] = useState("");

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    }

    return (
        <div className="header">
            <NavLink to="/" className="logo" onClick={() => handleLinkClick("/")}>Student Marketplace</NavLink>
            <div className="header-right">
                <NavLink
                    to="/products"
                    className={activeLink === "/products" ? "active" : ""}
                    onClick={() => handleLinkClick("/products")}>
                    Products
                </NavLink>
                <NavLink
                    to="/events"
                    className={activeLink === "/events" ? "active" : ""}
                    onClick={() => handleLinkClick("/events")}>
                    Events
                </NavLink>

                <NavLink
                    to="/tutorials"
                    className={activeLink === "/tutorials" ? "active" : ""}
                    onClick={() => handleLinkClick("/tutorials")}>
                    Tutorials
                </NavLink>
                {currentUser ? <>
                        <NavLink
                            to="/dashboard"
                            className={activeLink === "/dashboard" ? "active" : ""}
                            onClick={() => handleLinkClick("/dashboard")}>
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/checkout"
                            className={activeLink === "/checkout" ? "active" : ""}
                            onClick={() => handleLinkClick("/checkout")}>
                            Cart
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className={activeLink === "/profile" ? "active" : ""}
                            onClick={() => handleLinkClick("/profile")}>
                            Profile
                        </NavLink>
                        <NavLink
                            to="/login"
                            className={activeLink === "/login" ? "active" : ""}
                            onClick={() => {
                                logout().then(res => {
                                    navigate("/login")
                                })
                            }
                            }>
                            Logout
                        </NavLink>
                    </> :
                    <>
                        <NavLink
                            to="/login"
                            className={activeLink === "/login" ? "active" : ""}
                            onClick={() => handleLinkClick("/login")}>
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={activeLink === "/register" ? "active" : ""}
                            onClick={() => handleLinkClick("/register")}>
                            Register
                        </NavLink>
                    </>}
            </div>
        </div>
    );
}
