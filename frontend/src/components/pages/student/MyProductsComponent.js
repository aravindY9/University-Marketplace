import React, { useEffect, useState } from 'react';
import { fetchMyProducts, deleteProduct, updateProduct } from "../../../context/Database";
import { Table, Modal, Button, Form } from 'react-bootstrap';

export default function MyProductsComponent() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchMyProducts().then(res => {
            setProducts(res.data);
        });
    }, []);

    const handleDelete = (productId) => {
        deleteProduct(productId).then(() => {
            setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleSaveEdit = () => {
        updateProduct(editingProduct).then(() => {
            setProducts(prevProducts => prevProducts.map(product => product._id === editingProduct._id ? editingProduct : product));
            setEditingProduct(null);
        });
    };

    return (
        <div className="min-vh-100 p-4">
            <h3 className="mb-4">My Products</h3>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>{product.stock}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.details}</td>
                        <td>{product.status}</td>
                        <td>
                            <Button variant="primary" className="mr-2" onClick={() => handleEdit(product)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={editingProduct !== null} onHide={() => setEditingProduct(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingProduct && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={editingProduct.title} onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" step="0.01" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Details</Form.Label>
                                <Form.Control as="textarea" rows={3} value={editingProduct.details} onChange={(e) => setEditingProduct({...editingProduct, details: e.target.value})} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditingProduct(null)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
