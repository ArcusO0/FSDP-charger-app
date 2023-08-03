const { finalBooking, Sequelize } = require("../models");
const express = require("express");
const router = express.Router();
const yup = require("yup");

<<<<<<< HEAD
<<<<<<< HEAD
router.post("/addBooking", async(req, res) => {
=======
router.post("/addBooking", async (req, res) => {
>>>>>>> origin/Tyler
=======
router.post("/addBooking", async (req, res) => {
>>>>>>> b9b54912d474c7ba5f2e0308aaa5ca29b1fee421
    let data = req.body;
    let validationSchema = yup.object().shape({
        vendorId: yup.string().trim().min(5).max(5).required(),
        bookingId: yup.string().trim().min(5).max(5).required(),
<<<<<<< HEAD
<<<<<<< HEAD
        bookingPrice: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value + "").match(/^\d*\.{1}\d{0,2}$/)).required(),
=======
        bookingPrice: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value+"").match(/^\d*\.{1}\d{0,2}$/)).required(),
>>>>>>> origin/Tyler
=======
        bookingPrice: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value+"").match(/^\d*\.{1}\d{0,2}$/)).required(),
>>>>>>> b9b54912d474c7ba5f2e0308aaa5ca29b1fee421
        customerId: yup.string().trim().min(5).max(5).required(),
        evcId: yup.string().min(5).max(5).required(),
        duration: yup.number().min(1).max(12).required().integer(),
        arrivalTime: yup.string().required(),
    });
<<<<<<< HEAD
<<<<<<< HEAD
    try {
=======
    try{
>>>>>>> origin/Tyler
=======
    try{
>>>>>>> b9b54912d474c7ba5f2e0308aaa5ca29b1fee421
        await validationSchema.validate(data, {
            abortEarly: false,
            strict: true
        });
<<<<<<< HEAD
<<<<<<< HEAD
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
=======
=======
>>>>>>> b9b54912d474c7ba5f2e0308aaa5ca29b1fee421
    }
    catch (err) {
        console.error(err);
        res.status(400).json({errors: err.errors});
<<<<<<< HEAD
>>>>>>> origin/Tyler
=======
>>>>>>> b9b54912d474c7ba5f2e0308aaa5ca29b1fee421
        return;
    }
    data.vendorId = data.vendorId.trim();
    data.bookingId = data.bookingId.trim();
    data.customerId = data.customerId.trim();
    let result = await finalBooking.create(data);
    res.json(result);
});


<<<<<<< HEAD
<<<<<<< HEAD
router.get("/", async(req, res) => {
    let list = await finalBooking.findAll({
        order: [
            ['id', 'ASC']
        ]
=======
router.get("/", async (req, res) => {
    let list = await finalBooking.findAll({
        order:[['id', 'ASC']]
>>>>>>> origin/Tyler
=======
router.get("/", async (req, res) => {
    let list = await finalBooking.findAll({
        order:[['id', 'ASC']]
>>>>>>> b9b54912d474c7ba5f2e0308aaa5ca29b1fee421
    });
    res.json(list)
});

module.exports = router;