const express = require('express');
const router = express.Router();
const { chargers, Sequelize } = require('../models');
const yup = require("yup");

router.get("/", async(req, res) => {

    let list = await chargers.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    });
    res.json(list);
});

router.post("/", async(req, res) => {

    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        reqId: yup.number().min(0).max(10000000000).required(),
        name: yup.string().trim().min(3).max(100).required(),
        address: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required(),
        addOrDelete: yup.boolean().required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.name = data.name.trim();
    data.description = data.description.trim();
    data.address = data.address.trim();
    let result = await chargers.create(data);
    res.json(result);
});

module.exports = router;