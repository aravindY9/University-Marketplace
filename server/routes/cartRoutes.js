const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); 
const Product = require('../models/product')
const { default: mongoose } = require('mongoose');

router.post("/addtocart", (req, res) => {
    Cart.findOne({ username: req.user.username })
        .then(data => {
            let cart = data;
            if (!data) {
                cart = new Cart({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.user.username,
                    cart: [],
                });
            }
            cart.cart.push(req.body.product._id);
            cart.save()
                .then(() => {
                    Product.findById(req.body.product._id).then(product => {
                        product.stock = product.stock-1;
                        product.save().then(() => {
                            res.send("Item added to cart");
                        })
                    })  
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).send("Error occurred while adding item to cart");
                });
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("Error occurred while fetching cart");
        });
});

router.get("/cart", (req, res) => {
    if(req.user){
        Cart.findOne({ username: req.user.username })
            .populate('cart')
            .exec((err, data) => {
                if(err) {
                    res.status(500).send("Error occurred while fetching cart");
                    return;
                }
                if (!data) {
                    res.send({_id: 1, cart: []});
                  }else{
                    res.send(data);
                  }
            });
    } else {
        res.send([]);
    }
});


router.post("/removefromcart", (req, res) => {
    Cart.findOne({ username: req.user.username })
        .then(data => {
            if (!data) {
                return res.status(404).send("No cart found for user");
            }
            
            const productIndex = data.cart.indexOf(req.body.product._id);

            if (productIndex === -1) {
                return res.status(404).send("Product not found in cart");
            }

            data.cart.splice(productIndex, 1);

            data.save()
                .then(() => {
                    Product.findById(req.body.product._id).then(product => {
                        product.stock = product.stock+1;
                        product.save().then(() => {
                            res.send("Item removed from cart");
                        })
                    })  
                    
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send("Error occurred while removing item from cart");
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error occurred while fetching cart");
        });
});


module.exports = router;
