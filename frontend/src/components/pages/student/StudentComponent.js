import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import ChatComponent from "../chat/ChatComponent";
import MyOrdersComponent from "./MyOrdersComponent";
import MyProductsComponent from "./MyProductsComponent";
import AddTutorialsComponent from "./AddTutorialsComponent";
import TutorialComponent from "../student/TutorialsComponent";
import OrderRequestsComponent from "./OrderRequestsComponent";


export default function StudentComponent() {
    const [activeTab, setActiveTab] = useState('orders');
    return (
        <div className="min-vh-100 p-4">
            <Tabs activeKey={activeTab} onSelect={key => setActiveTab(key)}>
                <Tab eventKey="orders" title="My Orders">
                    <MyOrdersComponent/>
                </Tab>
                <Tab eventKey="orderRequests" title="Order Requests">
                    <OrderRequestsComponent/>
                </Tab>
                <Tab eventKey="products" title="Products">
                    <MyProductsComponent/>
                </Tab>

                <Tab eventKey="addtutorials" title="Add tutorial">
                    <AddTutorialsComponent/>
                </Tab>

                <Tab eventKey="mytutorials" title="My tutorial">
                    <TutorialComponent/>
                </Tab>

                <Tab eventKey="chats" title="Chats">
                    <ChatComponent/>
                </Tab>
            </Tabs>
        </div>
    );
}
