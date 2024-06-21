import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomeComponent";
import NavBar from "./navbar/Navbar";
import LoginComponent from "./pages/LoginComponent";
import Signup from "./pages/Signup";
import DashboardComponent from "./pages/DashboardComponent";
import {AuthProvider} from "../context/AuthContext";
import './css/bootstrap/bootstrap.css'
import ProtectedRoute from "./ProtectedRoute";
import {Footer} from "./pages/Footer";
import Checkout from "./pages/Checkout";

import ProductsComponent from "./pages/ProductsComponent";
import EventsComponent from "./pages/EventsComponent";
import TutorialsComponent from "./pages/TutorialsComponent";
import Profile from "./pages/Profile";


function App() {
    return (
        <AuthProvider>
            <div className="App" style={{overflowX: "hidden", minHeight: "100vh"}}>
                <NavBar/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
                      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                      crossOrigin="anonymous"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>


                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Gideon+Roman&display=swap"
                      rel="stylesheet"/>


                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/login" element={<LoginComponent/>}/>
                    <Route path="/register" element={<Signup/>}/>
                    <Route path="/events" element={<EventsComponent/>}/>
                    <Route path="/products" element={<ProductsComponent/>}/>
                    <Route path="/tutorials" element={<TutorialsComponent/>}/>
                    <Route path="/dashboard" element={<ProtectedRoute/>}>
                        <Route exact path='/dashboard' element={<DashboardComponent/>}/>
                    </Route>
                    <Route path="/checkout" element={<ProtectedRoute/>}>
                        <Route path="/checkout" element={<Checkout/>}/>
                    </Route>

                </Routes>
            </div>
            <Footer/>
        </AuthProvider>
    );
}

export default App;


