import React, { useEffect, useState } from 'react';
import { fetchSellerOrders, approveOrder } from "../../../context/Database";
import { Modal, Button, Tab, Tabs, Table } from 'react-bootstrap';

export default function OrderRequestsComponent() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchSellerOrders().then(res => {
            setOrders(res.data);
        });
    }, []);

    const handleApprove = (order) => {
        approveOrder(order._id)
            .then(res => {
                fetchSellerOrders().then(res => {
                    setOrders(res.data);
                });
            })
            .catch(err => {
                console.error("Error approving order:", err);
            });
    };

    return (
        <div className="min-vh-100 p-4">
            <h3 className="mb-4">My Orders</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>{order.status}</td>
                        <td>
                            {order.status === "PENDING" && (
                                <Button
                                    variant="primary"
                                    onClick={() => handleApprove(order)}
                                >
                                    Approve
                                </Button>
                            )}
                            <Button
                                variant="info"
                                className="ml-2"
                                onClick={() => setSelectedOrder(order)}
                            >
                                View Details
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={selectedOrder !== null} onHide={() => setSelectedOrder(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedOrder?.products.map(product => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>${product.price.toFixed(2)}</td>
                                {orders.map((order, index) => (
                    <tr key={order._id}>
                                <td>{order.status}</td></tr>))}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
