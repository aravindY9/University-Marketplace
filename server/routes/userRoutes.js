const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

const adminUsername = "admin"
const adminPassword = "password"
const adminRole = "admin"
const adminEmail = "admin@student.com"

User.findOne({ username: adminUsername }).then(async (admin) => {
    if(!admin){
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const newUser = new User({
	    _id: new mongoose.Types.ObjectId(),
            name: "ADMIN",
            email: adminEmail,
            username: adminUsername,
            password: hashedPassword,
            role: adminRole,
        });

        newUser.save().then( () => {
            console.log("Admin user created")
        })

    }

})



router.post("/register", async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send("Username and password are required.");
        }
        
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).send("User Already Exists");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email:req.body.email,
            username: req.body.username,
            password: hashedPassword,
            role: 'student',
        });

        await newUser.save();
        res.send("User Created");
    } catch (err) {
        console.log(err)
        res.status(500).send("Server error");
    }
});



router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).send("Authentication error");

        if (user) {
            req.logIn(user, (err) => {
                if (err) return res.status(500).send("Login error");
                res.send({   
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role
                });
            });
        } else {
            res.status(401).send("Invalid username or password");
        }
    })(req, res, next);
});

router.post("/logout", (req, res) => {
    req.logout();
    res.send("Logged out");
});

router.get("/user", async (req, res) => {
    try {
        if (req.user) {
            const user = await User.findOne({ username: req.user.username }).select('-password'); // Excluding password for security
            res.send({   
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.send({});
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
});


router.get("/users", async (req, res) => {
    try {
        if (req.user) {
            const users = await User.find({}).select('-password'); 
            res.send(users);
        } else {
            res.send([]);
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
});


router.post('/change-password', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated.');
    }

    if (!req.body.currentPassword || !req.body.newPassword) {
        return res.status(400).send('Both current and new passwords are required.');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).send('User not found.');
    }
    
    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isMatch) {
        return res.status(400).send('Current password is incorrect.');
    }

    user.password = await bcrypt.hash(req.body.newPassword, 10);
    await user.save();

    res.send('Password has been changed.');
});



module.exports = router;
