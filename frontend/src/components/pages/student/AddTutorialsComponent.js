import React, { useState } from 'react';
import { createTutorial } from "../../../context/Database";
import { Button, Form, Alert } from 'react-bootstrap';

export default function AddTutorialsComponent() {
    const [tutorial, setTutorial] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        slots: 0,
        price: 0,
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTutorial(tutorial);
            setSuccess(true);
            setError(null);
            setTutorial({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                slots: 0,
                price: 0,
            });
        } catch (err) {
            setError("Error creating tutorial. Please try again.");
            setSuccess(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTutorial(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="container mt-5">
            {success && <Alert variant="success">Tutorial successfully added!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={tutorial.title}
                        onChange={handleInputChange}
                        placeholder="Enter tutorial title"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={tutorial.description}
                        onChange={handleInputChange}
                        placeholder="Enter tutorial description"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="startDate"
                        value={tutorial.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="endDate"
                        value={tutorial.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Slots</Form.Label>
                    <Form.Control
                        type="number"
                        name="slots"
                        value={tutorial.slots}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price per hour</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={tutorial.price}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Tutorial
                </Button>
            </Form>
        </div>
    );
}
