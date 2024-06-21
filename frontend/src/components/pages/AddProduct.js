import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../context/Database";
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddProduct({ show, handleClose }) {
    const [image, setImage] = useState();
    const [error, setError] = useState('');
    const { currentUser } = useAuth();
    const navigation = useNavigate();

    const addNewItem = async (event) => {
        event.preventDefault();
        setError('');

        if (!image) {
            setError("Please select an image");
            return;
        }

        const ext = image.name.slice(image.name.lastIndexOf(".")).toLowerCase();
        if (![".jpg", ".jpeg", ".png", ".svg"].includes(ext)) {
            setError("File must be jpg, jpeg, png, or svg");
            return;
        }

        const item = {
            title: event.target.title.value,
            stock: event.target.stock.value,
            price: event.target.price.value,
            img: image,
            details: event.target.details.value
        };
        try {
            await addProduct(item);
            window.location.reload();
        } catch {
            setError("Failed to add product");
        }
    };

    const changeImage = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <Form onSubmit={addNewItem}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" required placeholder="Title" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" name="stock" required placeholder="Stock" min="1" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" required placeholder="Price" step="0.01" min="0" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Details</Form.Label>
                        <Form.Control type="text" name="details" required placeholder="Details" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name="img" required onChange={changeImage} />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button type="submit" className="btn btn-primary">Add Product</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
