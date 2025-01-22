const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const Product = require('../models/product_model'); // Import the product model
const userModel = require('../models/user-Model');

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error ,loggedin : false});
});

router.get("/shop", isLoggedin, async function (req, res) {
    try {
        const products = await Product.find(); // Fetch products from the database
        let success = req.flash("success"); 
        res.render("shop", { products , success}); // Pass products to the shop.ejs view

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/cart", isLoggedin, async function(req, res) {
    let user = await userModel.findOne({email :req.user.email}).populate("cart")
    const bill = Number(user.cart[0].price)+20 - Number(user.cart[0].discount)
    res.render("cart",{ user , bill }); 
});

router.get("/addtocart/:productid", isLoggedin, async function(req, res) {
    let user = await userModel.findOne({email: req.user.email});
    user.cart = [req.params.productid]; // Replace the cart contents with the new product ID
    await user.save();
    req.flash("success", "Product added to cart successfully!");
    res.redirect("/shop"); 
});

router.get("/logout", isLoggedin, function(req, res) {
    res.render("shop");
});

module.exports = router;
