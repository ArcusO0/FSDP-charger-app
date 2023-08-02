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
const { Request, Sequelize } = require("../models");
const express = require("express");
const yup = require("yup");

// Create "Add" and "Delete" Requests
router.post("/addRequest", async(req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        type: yup.string().oneOf(['Add', 'Delete']).required(),
        name: yup.string().trim().min(3).max(100).required(),
        address: yup.string().trim().min(3).max(500).required(),
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value + "").match(/^\d*\.{1}\d{2}$/)),
        description: yup.string().trim().min(3).max(500),
        status: yup.string().oneOf(["Pending", "Approved", "Rejected"]).required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false, strict: true })
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.type = data.type.trim();
    data.name = data.name.trim();
    data.status = data.status.trim();
    let result = await Request.create(data);
    res.json(result);
});

// Get all Requests
router.get("/", async(req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { type: {
                    [Sequelize.Op.like]: `${search}%` } },
            { name: {
                    [Sequelize.Op.like]: `${search}%` } },
            { status: {
                    [Sequelize.Op.like]: `${search}%` } }
        ];
    }
    let list = await Request.findAll({
        where: condition,
        order: [
            ['id', 'ASC']
        ]
    });
    res.json(list);
});

router.post("/", async(req, res) => {

    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        reqId: yup.string().min(0).max(10000000000).required(),
        name: yup.string().trim().min(3).max(100).required(),
        address: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required(),
        status: yup.string().trim().min(3).max(500).required(),
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
    data.status = data.status.trim();
    let result = await requests.create(data);
    res.json(result);
});

router.put("/:id", async(req, res) => {
    let id = req.params.id;
    // Check id not found
    let request = await requests.findByPk(id);
    // Get by ID 
    router.get("/:id", async(req, res) => {
        let id = req.params.id;
        let request = await Request.findByPk(id);
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


    res.json(request);
});

// Get by Type of Request
router.get("/:type", async(req, res) => {
    let type = req.params.type;
    let request = await Request.findAll(type);
    if (!request) {
        res.sendStatus(404);
        return;
    }
});

// Update Requests using Put
router.put("/updateRequest/:id", async(req, res) => {
    let id = req.params.id;
    let request = await Request.findByPk(id);
    if (!request) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    let validationSchema = yup.object().shape({
        type: yup.string().trim().min(3).max(100).required(),
        name: yup.string().trim().min(3).max(100).required(),
        status: yup.string().trim().min(3).max(100).required(),
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value + "").match(/^\d*\.{1}\d{0,2}$/)),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false, strict: true })
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.type = data.type.trim();
    data.name = data.name.trim();
    data.status = data.status.trim();
    let num = await Request.update(data, { where: { id: id } });
    if (num == 1) {
        res.json({
            message: "Request was updated successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot update request with id ${id}.`
        })
    }
});

// Delete Requests 
router.delete("/deleteRequest/:id", async(req, res) => {
    let id = req.params.id;
    let num = await Request.destroy({ where: { id: id } })
    if (num == 1) {
        res.json({ message: "Request was deleted successfully." });
    } else {
        res.json({ message: `Cannot delete Request with id ${id}` })
    }
});

module.exports = router;