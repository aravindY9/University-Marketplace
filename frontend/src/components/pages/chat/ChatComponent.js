import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    fetchAllUsers,
    fetchUserChats,
    sendMessage,
    fetchMessages,
    startChat,
} from "../../../context/Database";

export default function ChatComponent() {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [activeChatMessages, setActiveChatMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentTab, setCurrentTab] = useState("chats");
    const messageInputRef = useRef();

    useEffect(() => {
        fetchAllUsers().then(res => {
            setUsers(res.data.filter(user => user._id !== currentUser._id));
        });
        fetchUserChats().then(res => {
            setChats(res.data);
        });
    }, []);

    useEffect(() => {
        console.log(activeChatMessages);
    }, [activeChatMessages]);

    const initiateChat = (userId) => {
        const existingChat = chats.find(chat => chat.users.some(user => user._id === userId));
        if (existingChat) {
            setActiveChatId(existingChat._id);
            fetchMessages(existingChat._id).then(res => {
                setActiveChatMessages(res.data);
            });
            return;
        }
        startChat(userId).then(res => {
            const newChat = res.data;
            setChats(prevChats => [...prevChats, newChat]);
            setActiveChatId(newChat._id);
            setActiveChatMessages([]);
        });
    };

    const openChat = (chatId) => {
        setActiveChatId(chatId);
        fetchMessages(chatId).then(res => {
            setActiveChatMessages(res.data);
        });
    };

    const handleSendMessage = () => {
        const content = messageInputRef.current.value;
        if (content.trim()) {
            sendMessage(activeChatId, content).then(() => {
                setActiveChatMessages(prevMessages => [...prevMessages, { content, sender: currentUser }]);
                messageInputRef.current.value = '';
            });
        }
    };


    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const getOtherUserNameInChat = (chat) => {
        return chat.users.find(user => user._id !== currentUser._id).name;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left Split */}
                <div className="col-md-4">
                    <ul className="nav nav-tabs mb-3">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${currentTab === "chats" ? "active" : ""}`}
                                onClick={() => setCurrentTab("chats")}
                            >
                                Chats
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${currentTab === "users" ? "active" : ""}`}
                                onClick={() => setCurrentTab("users")}
                            >
                                All Users
                            </button>
                        </li>
                    </ul>

                    {currentTab === "chats" ? (
                        <ul className="list-group">
                            {chats.map(chat => (
                                <li key={chat._id} className="list-group-item" onClick={() => openChat(chat._id)}>
                                    {getOtherUserNameInChat(chat)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Search for users..."
                                className="form-control mb-3"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <ul className="list-group">
                                {filteredUsers.map(user => (
                                    <li key={user._id} className="list-group-item" onClick={() => initiateChat(user._id)}>
                                        {user.name}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Right Split */}
                <div className="col-md-8">
                    {activeChatId && (
                        <div className="chat-title mb-3">
                            Chat with: {getOtherUserNameInChat(chats.find(chat => chat._id === activeChatId))}
                        </div>
                    )}
                    <div className="chat-messages p-3 mb-3" style={{ height: '400px', overflowY: 'scroll' }}>
                        {activeChatMessages.map((msg, index) => (
                            <div key={index} className={msg.sender._id === currentUser._id ? "text-right" : ""}>
                                <strong>{msg.sender.name}: </strong> {msg.content}
                            </div>
                        ))}
                    </div>
                    <div>
                        <input
                            type="text"
                            className="form-control d-inline-block w-75 mr-2"
                            ref={messageInputRef}
                            placeholder="Type a message..."
                        />
                        <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
