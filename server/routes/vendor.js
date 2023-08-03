const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Vendor } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

router.post("/register", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().matches(/^[a-z ,.'-]+$/i)
            .min(3).max(50).required(),
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.name = data.name.trim();
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();

    // Check email
    let vendor = await Vendor.findOne({
        where: { email: data.email }
    });
    if (vendor) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }

    // Hash passowrd
    data.password = await bcrypt.hash(data.password, 10);
    // Create 
    let result = await Vendor.create(data);
    res.json(result);
});

router.post("/login", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().matches(/^[a-z ,.'-]+$/i)
            .min(3).max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.name = data.name.trim();
    data.password = data.password.trim();

    // Check email and password
    let errorMsg = "Email or password is not correct.";
    let vendor = await Vendor.findOne({
        where: { name: data.name }
    });
    if (!vendor) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    let match = await bcrypt.compare(data.password, vendor.password);
    if (!match) {
        res.status(400).json({ message: errorMsg });
        return;
    }

    // Return vendor info
    let vendorInfo = {
        id: vendor.id,
        email: vendor.email,
        name: vendor.name
    };
    let accessToken = sign(vendorInfo, process.env.APP_SECRET);
    res.json({
        accessToken: accessToken,
        vendor: vendorInfo
    });
});

router.get("/auth", validateToken, (req, res) => {
    let vendorInfo = {
        id: req.vendor.id,
        email: req.vendor.email,
        name: req.vendor.name
    };
    res.json({
        vendor: vendorInfo
    });
});

module.exports = router;
