const express = require('express');
const router = express.Router();
const Tutorial = require('../models/tutorial');

// Create tutorial
router.post('/tutorial/add', async (req, res) => {
    try {
        const tutorial = new Tutorial(req.body);
        tutorial.offeredBy = req.user._id; 
        await tutorial.save();
        res.status(201).send(tutorial);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update tutorial
router.put('/tutorial/:id', async (req, res) => {
    try {
        const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("enrolledUsers");
        res.send(tutorial);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete tutorial
router.delete('/tutorial/:id', async (req, res) => {
    try {
        const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
        res.send(tutorial);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all tutorials
router.get('/tutorial', async (req, res) => {
    try {
        const tutorials = await Tutorial.find().populate("enrolledUsers").populate("offeredBy");
        res.send(tutorials);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tutorial/approved', async (req, res) => {
    try {
        const tutorials = await Tutorial.find({ status: 'APPROVED' })
        .populate("offeredBy").populate("enrolledUsers");
        res.send(tutorials);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tutorial/my', async (req, res) => {
    try {
        const tutorials = await Tutorial.find({ offeredBy: req.user._id }).populate("offeredBy").populate("enrolledUsers");
        res.send(tutorials);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Enroll for a tutorial
router.post('/tutorial/enroll/:id', async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id)
        .populate("offeredBy");
        if (tutorial.slots > 0 && !tutorial.enrolledUsers.includes(req.user._id)) {
            tutorial.enrolledUsers.push(req.user._id);
            tutorial.slots--;
            await tutorial.save();
            res.send(tutorial);
        } else {
            res.status(400).send("Slots unavailable or already enrolled");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/tutorial/unenroll/:id', async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        if (!tutorial) {
            return res.status(404).send('Tutorial not found.');
        }
        
        const userIndex = tutorial.enrolledUsers.indexOf(req.user._id);

        if (userIndex !== -1) { 
            tutorial.enrolledUsers.splice(userIndex, 1);  
            tutorial.slots++; 
            await tutorial.save();
            res.send(tutorial);
        } else {
            res.status(400).send("You're not enrolled in this tutorial.");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


router.put('/tutorial/approve/:id', async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).send('Access denied. Only admins can approve tutorials.');
        }

        const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, { status: 'APPROVED' }, { new: true });

        if (!tutorial) {
            return res.status(404).send('Tutorial not found.');
        }
        res.send(tutorial);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
