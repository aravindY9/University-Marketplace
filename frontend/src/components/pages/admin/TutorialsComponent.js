import { useAuth } from "../../../context/AuthContext";
import React, {useEffect, useState} from "react";
import {fetchAllTutorials, approveTutorial} from "../../../context/Database";
import {Button, Table} from "react-bootstrap";

export default function TutorialsComponent() {
    const [tutorials, setTutorials] = useState([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        fetchAllTutorials().then(res => {
            setTutorials(res.data);
        });
    }, []);



    const handleApprove = (tutorialId) => {
        approveTutorial(tutorialId).then(() => {
            fetchAllTutorials().then(res => {
                setTutorials(res.data);
            });
        }).catch(err => {
            console.error("Error approving tutorial:", err);
        });
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
                        <td>${tutorial.price}</td>
                        <td>{tutorial.offeredBy.name}</td>
                        <td>
                            {tutorial.status === "PENDING" && currentUser && currentUser.role === 'admin' &&
                                <Button variant="success" onClick={() => handleApprove(tutorial._id)}>Approve</Button>
                            }
                            </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}
