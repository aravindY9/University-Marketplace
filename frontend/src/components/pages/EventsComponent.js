import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "../../context/Database";
import { Modal, Card, Button, Image } from 'react-bootstrap';


export default function EventsComponent() {
    const { currentUser } = useAuth();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {
        fetchAllEvents().then(res => {
            setEvents(res.data.events);
        });
    }, []);

    const handleDetailsClick = (event) => {
        setSelectedEvent(event);
    };

    const handleClose = () => {
        setSelectedEvent(null);
    };

    console.log(selectedEvent)

    return (
        <>
            <div className="min-vh-100">
                <div className="content">
                    <h1>Upcoming Events</h1>
                    <table className="events-table">
                        <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <td>{event.eventName}</td>
                                <td>{new Date(event.date).toLocaleDateString('en-GB')}</td>
                                <td>{event.time}</td>
                                <td>{event.location}</td>
                                <td><button onClick={() => handleDetailsClick(event)}>View Details</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedEvent && (
                <Modal show={true} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedEvent.eventName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Image src={selectedEvent.image} alt={selectedEvent.eventName} fluid />
                        <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString('en-GB')}</p>
                        <p><strong>Time:</strong> {selectedEvent.time}</p>
                        <p><strong>Location:</strong> {selectedEvent.location}</p>
                        <Card.Text>
    {selectedEvent.details.includes('http') ? (
        // If the details contain 'http', render as a hyperlink
        <p>
            <strong>Details:</strong> <a href={selectedEvent.details} target="_blank" rel="noopener noreferrer">{selectedEvent.details}</a>
        </p>
    ) : (
        // If not, render as plain text
        <p><strong>Details:</strong> {selectedEvent.details}</p>
    )}
</Card.Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
