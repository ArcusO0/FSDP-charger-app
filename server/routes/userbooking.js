const express = require('express');
const router = express.Router();
const { UserBooking, Sequelize } = require('../models');
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        vendorID: yup.string().required(),
        bookingID: yup.string().required(),
        customerID: yup.string().required(),
        evcID: yup.string().required(),
        bookingPrice: yup.number().required(),
        duration: yup.number().min(1).max(12).required(),
        arrivaltime: yup.string().trim().min(5).max(5).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.vendorID = data.vendorID.trim();
    data.bookingID = data.bookingID.trim();
    data.customerID = data.customerID.trim();
    data.evcID = data.evcID.trim();
    data.bookingPrice = data.bookingPrice
    data.duration = data.duration;
    data.arrivaltime = data.arrivaltime;
    let result = await UserBooking.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
<<<<<<< HEAD
            { vendorID: { [Sequelize.Op.like]: `%${search}%` } },
            { bookingID: { [Sequelize.Op.like]: `%${search}%` } },
            { customerID: { [Sequelize.Op.like]: `%${search}%` } },
            { evcID: { [Sequelize.Op.like]: `%${search}%` } },
            { bookingPrice: { [Sequelize.Op.like]: `%${search}%` } },
            { duration: { [Sequelize.Op.like]: `%${search}%` } },
            { arrivaltime: { [Sequelize.Op.like]: `%${search}%` } },
=======
            { email: { [Sequelize.Op.like]: `%${search}%` } },
            { license: { [Sequelize.Op.like]: `%${search}%` } },
            { hours: { [Sequelize.Op.like]: `%${search}%` } },
            { arrival: { [Sequelize.Op.like]: `%${search}%` } },
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
        ];
    }

    let list = await UserBooking.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let userbooking = await UserBooking.findByPk(id);
    // Check id not found
    if (!userbooking) {
        res.sendStatus(404);
        return;
    }
    res.json(userbooking);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let userbooking = await UserBooking.findByPk(id);
    if (!userbooking) {
        res.sendStatus(404);
        return;
    }
    
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        vendorID: yup.string().required(),
        bookingID: yup.string().required(),
        customerID: yup.string().required(),
        evcID: yup.string().required(),
        bookingPrice: yup.number().required(),
        duration: yup.number().min(1).max(12).required(),
        arrivaltime: yup.string().trim().min(5).max(5).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.vendorID = data.vendorID.trim();
    data.bookingID = data.bookingID.trim();
    data.customerID = data.customerID.trim();
    data.evcID = data.evcID.trim();
    data.bookingPrice = data.bookingPrice
    data.duration = data.duration;
    data.arrivaltime = data.arrivaltime;
    let num = await UserBooking.update(data, {
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
    let userbooking = await UserBooking.findByPk(id);
    if (!userbooking) {
        res.sendStatus(404);
        return;
    }

    let num = await UserBooking.destroy({
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