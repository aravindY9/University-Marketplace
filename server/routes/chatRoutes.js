const express = require('express');
const router = express.Router();
const Chat = require('../models/chat'); 
const User = require('../models/user');

// Middleware to check if the user is logged in
function ensureAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).send("Unauthorized: Please log in first");
    }
}

router.use(ensureAuthenticated);

// Start a new chat with another user
router.post("/start", async (req, res) => {
    const { userId } = req.body;
    try {
        // Check if the other user exists
        const otherUser = await User.findById(userId);
        if (!otherUser) {
            return res.status(404).send("User not found");
        }

        // Create a new chat with the two users
        const chat = new Chat({
            users: [req.user._id, userId],
            messages: []
        });

        await chat.save();
        const populatedChat = await Chat.findOne({_id:chat._id}).populate('messages.sender').populate('users');
        res.status(200).send(populatedChat);
    } catch (err) {
        console.log(err)
        res.status(500).send("Error occurred: " + err.message);
    }
});

// Send a message in a chat
router.post("/message/:chatId", async (req, res) => {
    const { content } = req.body;
    const { chatId } = req.params;
    try {
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).send("Chat not found");
        }

        if (!chat.users.includes(req.user._id)) {
            return res.status(403).send("You are not part of this chat");
        }

        chat.messages.push({
            sender: req.user._id,
            content: content
        });

        await chat.save();
        res.status(200).send("Message sent");
    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
});

// Get all messages from a specific chat
router.get("/messages/:chatId", async (req, res) => {
    const { chatId } = req.params;
    try {
        const chat = await Chat.findById(chatId).populate('messages.sender').populate('users');

        if (!chat) {
            return res.status(404).send("Chat not found");
        }

        if (!chat.users.includes((user) => user._id === req.user._id) && false) {
            return res.status(403).send("You are not part of this chat");
        }

        res.status(200).send(chat.messages);
    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
});

// Get all chats for a user
router.get("/chats", async (req, res) => {
    try {
        const chats = await Chat.find({ users: req.user._id }).populate('users');
        res.status(200).send(chats);
    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
});

module.exports = router;
