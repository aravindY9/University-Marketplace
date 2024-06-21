const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require("mongoose");
const Product = require('../models/product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "static/pictures");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + ".jpg");
    },
});

const upload = multer({ storage: storage });

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
    if (!req.user) {
        return res.status(401).send("Unauthorized: Please log in first");
    }
    next();
}

// Middleware to ensure user is admin
function ensureAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).send("Only admins can perform this action");
    }
    next();
}

router.post("/product", ensureAuthenticated, upload.single("img"), (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        seller: req.user._id,
        stock: req.body.stock,
        price: req.body.price,
        picture: "http://localhost:4000/picture/" + req.file.filename,
        details: req.body.details,
    });

    product.save()
        .then(() => {
            res.status(200).send("Success");
        })
        .catch(err => {
            res.status(500).send("Error occurred: " + err.message);
        });
});

// Everyone, including unauthorized users, can see approved products
router.get("/products", (req, res) => {
    Product.find({ status: "APPROVED" }).populate("seller")
        .exec().then((products) => {
            res.send(products);
        })
        .catch(err => {
            res.status(500).send("Error occurred: " + err.message);
        });
});

router.get("/all-products", ensureAdmin, (req, res) => {
    Product.find().populate("seller")
        .exec().then((products) => {
            res.send(products);
        })
        .catch(err => {
            res.status(500).send("Error occurred: " + err.message);
        });
});

router.get("/searchProducts", (req, res) => {
    const search = req.query.search || '';
    Product.find({ title: { $regex: search, $options: "i" }, status: "APPROVED" })
        .then((products) => {
            res.send(products);
        })
        .catch(err => {
            res.status(500).send("Error occurred: " + err.message);
        });
});

router.put("/product/:id", ensureAuthenticated, upload.single("img"), (req, res) => {
    let updateObject = {
        title: req.body.title,
        stock: req.body.stock,
        price: req.body.price,
        details: req.body.details,
    };

    if (req.file) {
        updateObject.picture = "http://localhost:4000/picture/" + req.file.filename;
    }

    Product.findOne({ _id: req.params.id, seller: req.user._id })
        .then(product => {
            if (!product && req.user.role !== 'admin') {
                return res.status(404).send("Product not found or unauthorized");
            }
            return Product.findByIdAndUpdate(req.params.id, updateObject, { new: true });
        })
        .then(product => {
            res.send(product);
        })
        .catch(err => {
            res.status(500).send("Error occurred: " + err.message);
        });
});

router.delete("/product/:id", ensureAuthenticated, (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id, seller: req.user._id })
        .then(() => {
            if (req.user.role === 'admin') {
                return Product.findByIdAndDelete(req.params.id);
            }
        })
        .then(() => {
            res.status(200).send("Product deleted successfully");
        })
        .catch(err => {
            res.status(500).send("Error occurred: " + err.message);
        });
});

router.get("/picture/:file", (req, res) => {
    const path = "static/pictures/" + req.params.file;
    res.download(path, (err) => {
        if (err) {
            res.status(500).send("Error occurred: " + err.message);
        }
    });
});

// Additional functionalities

router.put("/product/approve/:id", ensureAdmin, (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { status: "APPROVED" }, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send("Product not found");
            }
            res.send(product);
        })
        .catch(err => {
            res.status(500).send("Error occurred: " + err.message);
        });
});

router.get("/my-products", ensureAuthenticated, (req, res) => {
    Product.find({ seller: req.user._id })
        .then(products => {
            res.send(products);
        })
        .catch(err => {
            res.status(500).send("Error occurred: " + err.message);
        });
});

module.exports = router;
