import {useAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchAllEvents, deleteEvent} from "../../../context/Database";

export default function EventsComponent() {
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchAllEvents().then(res => {
            console.log(res.data)
            setEvents(res.data.events);
        });
    }, []);

    const handleDelete = (eventId) => {
        deleteEvent(eventId)
            .then(() => {
                setEvents(events.filter(event => event._id !== eventId));
            })
            .catch(err => {
                console.error("Failed to delete the event:", err);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Events List</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {events.map(event => (
                    <tr key={event._id}>
                        <td>{event.eventName}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.time}</td>
                        <td>{event.location}</td>
                        <td>{event.details.substring(0, 50)}{event.details.length > 50 ? "..." : ""}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(event._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
