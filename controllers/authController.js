const userModel = require('../models/user-Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generatetoken');

module.exports.addToCart = async function (req, res) {
    try {
        const productId = req.params.id;
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Replace the existing cart contents with the new product ID
        user.cart = [productId]; // Set the cart to only contain the new product
        await user.save();

        return res.status(200).json({ message: "Product added to cart" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.registerUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "User already exists");
            return res.redirect("/"); // Redirect to the home page or registration page
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    req.flash("error", err.message);
                    return res.redirect("/"); // Redirect on error
                } else {
                    let user = await userModel.create({
                        email,
                        fullname,
                        password: hash,
                    });
                    let token = generateToken(user);
                    res.cookie('token', token);
                    req.flash("success", "User created successfully!");
                    return res.redirect("/shop"); // Redirect to the shop page
                }
            });
        });
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/"); // Redirect on error
    }
}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/"); // Redirect on error
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie('token', token);
            req.flash("success", "Login successful!");
            return res.redirect("/shop");
        } else {
            req.flash("error", "Email or password is incorrect");
            return res.redirect("/"); // Redirect on error
        }
    });
}

module.exports.logout = function (req, res) {
    res.clearCookie('token'); // Clear the token cookie
    req.flash("success", "Logged out successfully!");
    res.redirect("/"); // Send a response
}
