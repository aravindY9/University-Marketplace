import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
    enrollInTutorial,
    unrollInTutorial,
    fetchApprovedTutorials
} from "../../context/Database";
import { Button, Table } from 'react-bootstrap';

export default function TutorialsComponent() {
    const [tutorials, setTutorials] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchApprovedTutorials().then(res => {
            setTutorials(res.data);
        });
    }, []);

    const handleEnroll = (tutorialId) => {
        enrollInTutorial(tutorialId).then(() => {
            fetchApprovedTutorials().then(res => {
                setTutorials(res.data);
            });
        });
    };

    const handleUnroll = (tutorialId) => {
        unrollInTutorial(tutorialId).then(() => {
            fetchApprovedTutorials().then(res => {
                setTutorials(res.data);
            });
        });
    };

    const isUserEnrolled = (tutorial) => {
        return tutorial.enrolledUsers.some(user => user._id === currentUser._id);
    };

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
                    <th>Offered By</th>
                    <th>Price</th>
                    <th>Action</th>
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
                        <td>{tutorial.offeredBy.name}</td>
                        <td>${tutorial.price}</td>
                        <td>
                            {currentUser && tutorial.slots > 0 && currentUser._id !== tutorial.offeredBy._id && (
                                <>
                                    <div style={{ display: "flex", gap: "10px" }}>
    <Button
        variant={isUserEnrolled(tutorial) ? "secondary" : "primary"}
        disabled={isUserEnrolled(tutorial)}
        onClick={() => handleEnroll(tutorial._id)}
    >
        {isUserEnrolled(tutorial) ? "Enrolled" : "Enroll"}
    </Button>
    <Button
        variant="danger"
        disabled={!isUserEnrolled(tutorial)}
        onClick={() => handleUnroll(tutorial._id)}
    >
        Unroll
    </Button>
</div>

                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}
