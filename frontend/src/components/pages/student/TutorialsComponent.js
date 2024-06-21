import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import {fetchMyTutorials} from "../../../context/Database";

export default function TutorialComponent() {
    const [tutorials, setTutorials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [enrolledUsers, setEnrolledUsers] = useState([]);

    useEffect(() => {
        fetchMyTutorials().then(res => {
            setTutorials(res.data);
        });
    }, []);


    const handleShowModal = (tutorial) => {
        console.log(tutorial)
        setEnrolledUsers(tutorial.enrolledUsers);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="container mt-5">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Slots</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tutorials.map(tutorial => (
                    <tr key={tutorial._id}>
                        <td>{tutorial.title}</td>
                        <td>{tutorial.description}</td>
                        <td>{new Date(tutorial.startDate).toLocaleDateString()}</td>
                        <td>{new Date(tutorial.endDate).toLocaleDateString()}</td>
                        <td>{tutorial.slots}</td>
                        <td>{tutorial.status}</td>
                        <td>${tutorial.price}</td>
                        <td>
                            <Button onClick={() => handleShowModal(tutorial)}>
                                Show Enrolled
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enrolled Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {enrolledUsers.length > 0 ? (
                        <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                            ))}
                        </tbody>
                        </Table>
                    ) : (
                        <div>No students enrolled yet.</div>
                    )}
                </Modal.Body>                                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
