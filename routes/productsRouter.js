const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product_model');

router.post('/create', upload.single('image'), async function (req, res)  {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let product = new productModel({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    });

    try {
        await product.save(); // Save the product to the database
        console.log("Product created:", product);
        req.flash("success", "Product Created Successfully");
        res.redirect("/owners/admin");
    } catch (error) {
        console.error("Error saving product:", error);
        req.flash("error", "Failed to create product");
        res.redirect("/owners/admin");
    }
});

module.exports = router;
