import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Tab, Tabs, Container } from 'react-bootstrap';
import AddEventComponent from "./AddEventComponent";
import EventsComponent from "./EventsComponent";
import ProductsComponent from "./ProductsComponent";
import TutorialsComponent from "./TutorialsComponent";
import ChatComponent from "../chat/ChatComponent";
import OrderRequestsComponent from "../student/OrderRequestsComponent";

export default function AdminComponent() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();


    return (
        <Container className="mt-5">
            <Tabs defaultActiveKey="events" id="admin-tabs">
                <Tab eventKey="events" title="Events">
                    <EventsComponent />
                </Tab>
                <Tab eventKey="orderRequests" title="Order Requests">
                    <OrderRequestsComponent/>
                </Tab>
                <Tab eventKey="addEvent" title="Add Event">
                   <AddEventComponent/>
                </Tab>
                <Tab eventKey="products" title="Products">
                    <ProductsComponent />
                </Tab>
                <Tab eventKey="tutorials" title="Tutorials">
                    <TutorialsComponent />
                </Tab>
                <Tab eventKey="chat" title="Chat">
                    <ChatComponent />
                </Tab>
            </Tabs>
        </Container>
    );
}
