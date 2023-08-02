const { Booking, Sequelize } = require("../models");
const express = require("express");
const router = express.Router();
const yup = require("yup");

router.post("/addBooking", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        vendorId: yup.string().trim().min(5).max(5).required(),
        bookingId: yup.string().trim().min(5).max(5).required(),
        bookingPrice: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value+"").match(/^\d*\.{1}\d{0,2}$/)).required(),
        bookingDateTime: yup.string().required(),
        customerId: yup.string().trim().min(5).max(5).required(),
        evcId: yup.string().min(5).max(5).required()
    });
    try{
        await validationSchema.validate(data, {
            abortEarly: false,
            strict: true
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({errors: err.errors});
        return;
    }
    data.vendorId = data.vendorId.trim();
    data.bookingId = data.bookingId.trim();
    data.customerId = data.customerId.trim();
    let result = await Booking.create(data);
    res.json(result);
});


router.get("/", async (req, res) => {
    let list = await Booking.findAll({
        order:[['id', 'ASC']]
    });
    res.json(list)
});

module.exports = router;