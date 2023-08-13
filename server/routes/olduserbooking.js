const express = require('express');
const router = express.Router();
const { OldUserBooking, Sequelize } = require('../models');
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        email: yup.string().trim().min(3).max(321).required(),
        license: yup.string().trim().min(5).max(10).required(),
        hours: yup.number().min(1).max(12).required(),
        arrival: yup.string().trim().min(5).max(5).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.email = data.email.trim();
    data.license = data.license.trim();
    data.hours = data.hours;
    data.arrival = data.arrival;
    let result = await OldBooking.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { email: { [Sequelize.Op.like]: `%${search}%` } },
            { license: { [Sequelize.Op.like]: `%${search}%` } },
            { hours: { [Sequelize.Op.like]: `%${search}%` } },
            { arrival: { [Sequelize.Op.like]: `%${search}%` } },
        ];
    }

    let list = await OldBooking.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let oldbooking = await OldBooking.findByPk(id);
    // Check id not found
    if (!oldbooking) {
        res.sendStatus(404);
        return;
    }
    res.json(oldbooking);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let oldbooking = await OldBooking.findByPk(id);
    if (!oldbooking) {
        res.sendStatus(404);
        return;
    }
    
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        email: yup.string().trim().min(3).max(321).required(),
        license: yup.string().trim().min(5).max(10).required(),
        hours: yup.number().min(1).max(12).required(),
        arrival: yup.string().trim().min(5).max(5).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.email = data.email.trim();
    data.license = data.license.trim();
    data.hours = data.hours.trim();
    data.arrival = data.arrival.trim();
    let num = await OldBooking.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Booking was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update booking with id ${id}.`
        });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let oldbooking = await OldBooking.findByPk(id);
    if (!oldbooking) {
        res.sendStatus(404);
        return;
    }

    let num = await OldBooking.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Booking was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete booking with id ${id}.`
        });
    }
});

module.exports = router;