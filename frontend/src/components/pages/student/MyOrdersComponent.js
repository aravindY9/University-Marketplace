import React, { useEffect, useState } from 'react';
import { fetchMyOrders } from "../../../context/Database";
import { Modal, Button, Tab, Tabs, Table } from 'react-bootstrap';
import ChatComponent from "../chat/ChatComponent";

export default function MyOrdersComponent() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchMyOrders().then(res => {
            setOrders(res.data);
        });
    }, []);

    console.log(orders)

    const getProducts = (order) => {
        let productCounts = {};
    
        order.products.forEach(product => {
            if (productCounts[product._id]) {
                productCounts[product._id].quantity++;
            } else {
                productCounts[product._id] = {
                    title: product.title,
                    quantity: 1
                };
            }
        });
    
        let productsString = "";
        for (let id in productCounts) {
            productsString += `${productCounts[id].title} (Quantity: ${productCounts[id].quantity}) `;
        }
    
        return productsString.trim();
    };

    const viewPaymentDetails = (order) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="min-vh-100 p-4">
            <h3 className="mb-4">My Orders</h3>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Products</th>
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
                        <td>{getProducts(order)}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>{order.status}</td>
                        <td>
                            <Button variant="info" className="mr-2" onClick={() => viewPaymentDetails(order)}>View Payment</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={selectedOrder !== null} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <>
                            <p><strong>Card Number:</strong> {selectedOrder.paymentDetails.cardNumber}</p>
                            <p><strong>Expiration Date:</strong> {selectedOrder.paymentDetails.expirationDate}</p>
                            <p><strong>CVV:</strong> {selectedOrder.paymentDetails.cvv}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
