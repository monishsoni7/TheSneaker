const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

// console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
    router.post('/create', async function (req, res) {
       let onwers = await ownerModel.find()
       if(onwers.length>0){
        return res.status(503).send("you don't have permission to create owner")
       }
let {fullName, eamil, password} = req.body;

let createduser = await  ownerModel.create({
    fullName,
    eamil,
    password,
})

req.flash('success', 'Owner created successfully!'); // Set success message
res.status(201).send("we can create a new owner")
    })
}

router.get('/admin', (req, res) => {
    const success = req.flash('success') || []; // Assuming you're using connect-flash for flash messages
    res.render('createproducts', { success });
});

module.exports = router;
