import {useAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

import {addEvent} from "../../../context/Database";

export default function AddEventComponent() {
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        eventName: "",
        date: "",
        time: "",
        location: "",
        details: "",
        img: null
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "img") {
            if (e.target.files[0].size > 2000000) { // 2MB limit
                setErrorMessage("Image size should be less than 2MB");
                return;
            }
            setFormData(prevState => ({...prevState, [e.target.name]: e.target.files[0]}));
        } else {
            setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.img) {
            setErrorMessage("Please upload an image.");
            return;
        }
        addEvent(formData).then(response => {
            alert("Added event successfully")
            window.location.reload()
            setErrorMessage("")
        }).catch(error => {
            setErrorMessage("Failed to add event. Please try again.");
        });
    };

    return (
        <div className="container mt-5">
            <h2>Add New Event</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name</label>
                    <input type="text" className="form-control" id="eventName" name="eventName" required
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" id="date" name="date" required onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input type="time" className="form-control" id="time" name="time" required onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" className="form-control" id="location" name="location" required
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <textarea className="form-control" rows="3" id="details" name="details" required
                              onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="img">Image</label>
                    <input type="file" className="form-control-file" id="img" name="img" accept="image/*"
                           onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Event
                </button>
            </form>
        </div>
    );

}
