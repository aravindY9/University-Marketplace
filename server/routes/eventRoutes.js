const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require("mongoose");
const Event = require('../models/event');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "static/pictures");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + ".jpg");
    },
});

const upload = multer({ storage: storage });

function ensureAuthenticated(req, res, next) {
    if (!req.user) {
        return res.status(401).send("Unauthorized: Please log in first");
    }
    next();
}

function ensureAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).send("Only admins can perform this action");
    }
    next();
}

router.post("/event", ensureAdmin, upload.single("img"), (req, res) => {
    let picture = "http://localhost:4000/picture/" + req.file.filename;
 
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        eventName: req.body.eventName,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        details: req.body.details,
        image: picture
    });
 
    event.save()
    .then(result => {
        res.status(201).json({
            message: "Event added successfully",
            data: result
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
 });
 
 router.put("/event/:eventId", ensureAdmin, upload.single("img"), (req, res) => {
     const eventId = req.params.eventId;
 
     let picture = req.body.image; 
     if (req.file) {
         picture = "http://localhost:4000/picture/" + req.file.filename;
     }
 
     const updateOps = {};
     for (const ops of Object.keys(req.body)) {
         updateOps[ops] = req.body[ops];
     }
     updateOps['image'] = picture;
 
     Event.update({ _id: eventId }, { $set: updateOps })
     .exec()
     .then(result => {
         res.status(200).json({
             message: "Event updated",
         });
     })
     .catch(error => {
         res.status(500).json({
             error: error
         });
     });
 });
 
 router.delete("/event/:eventId", ensureAdmin, (req, res) => {
     const eventId = req.params.eventId;
 
     Event.remove({ _id: eventId })
     .exec()
     .then(result => {
         res.status(200).json({
             message: "Event deleted",
         });
     })
     .catch(error => {
         res.status(500).json({
             error: error
         });
     });
 });
 
 router.get("/events", (req, res) => {
     Event.find()
     .exec()
     .then(docs => {
         res.status(200).json({
             count: docs.length,
             events: docs.map(doc => {
                 return {
                     _id: doc._id,
                     eventName: doc.eventName,
                     date: doc.date,
                     time: doc.time,
                     location: doc.location,
                     details: doc.details,
                     image: doc.image
                 };
             })
         });
     })
     .catch(error => {
         res.status(500).json({
             error: error
         });
     });
 });
 
module.exports = router;
