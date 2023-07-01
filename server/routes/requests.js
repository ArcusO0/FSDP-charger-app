const express = require('express');
const router = express.Router();
const { requests, Sequelize } = require('../models');
const yup = require("yup");

router.get("/", async(req, res) => {

    let list = await requests.findAll({
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
    let result = await requests.create(data);
    res.json(result);
});

router.put("/:id", async(req, res) => {
    let id = req.params.id;
    // Check id not found
    let request = await requests.findByPk(id);
    if (!request) {
        res.sendStatus(404);
        return;
    }

    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        status: yup.string().trim().min(3).max(10).required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.status = data.status.trim();
    let num = await requests.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Request was updated successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot update request with id ${id}.`
        });
    }
});

module.exports = router;