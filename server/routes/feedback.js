const express = require('express');
const router = express.Router();
const { Feedback, Sequelize } = require('../models');
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        title: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.title = data.title.trim();
    data.description = data.description.trim();
    let result = await Feedback.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { title: { [Sequelize.Op.like]: `%${search}%` } },
            { description: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await Feedback.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let feedback = await Feedback.findByPk(id);
    // Check id not found
    if (!feedback) {
        res.sendStatus(404);
        return;
    }
    res.json(feedback);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let feedback = await Feedback.findByPk(id);
    if (!feedback) {
        res.sendStatus(404);
        return;
    }
    
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        title: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.title = data.title.trim();
    data.description = data.description.trim();
    let num = await Feedback.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Feedback was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update feedback with id ${id}.`
        });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let feedback = await Feedback.findByPk(id);
    if (!feedback) {
        res.sendStatus(404);
        return;
    }

    let num = await Feedback.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Feedback was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete feedback with id ${id}.`
        });
    }
});

module.exports = router;