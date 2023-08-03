<<<<<<< HEAD
const { finalEVC, Sequelize } = require("../models");
=======
const { finalEVC, Sequelize } = require("../models"); 
>>>>>>> origin/Tyler
const express = require("express");
const router = express.Router();
const yup = require("yup");

// Create EVC Information
<<<<<<< HEAD
router.post("/addEVC", async(req, res) => {
=======
router.post("/addEVC", async (req, res) => {
>>>>>>> origin/Tyler
    let data = req.body;
    let validationSchema = yup.object().shape({
        vendorId: yup.string().trim().min(5).max(5).required(),
        chargerId: yup.string().trim().min(5).max(5).required(),
        name: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().max(500),
        address: yup.string().trim().min(3).max(500).required(),
<<<<<<< HEAD
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value + "").match(/^\d*\.{1}\d{0,2}$/)).required(),
        rating: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 1 decimal place', (value) => (value + "").match(/^\d*\.{1}\d?$/)).required(),
        status: yup.string().oneOf(["Good", "Poor", "Critical"]).required(),
        noOfBookings: yup.number().min(0).required()
    });
    try {
=======
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value+"").match(/^\d*\.{1}\d{0,2}$/)).required(),
        rating: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 1 decimal place', (value) => (value+"").match(/^\d*\.{1}\d?$/)).required(),
        status: yup.string().oneOf(["Good", "Poor", "Critical"]).required(),
        noOfBookings: yup.number().min(0).required()
    });
    try{
>>>>>>> origin/Tyler
        await validationSchema.validate(data, {
            abortEarly: false,
            strict: true
        });
<<<<<<< HEAD
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
=======
    }
    catch (err) {
        console.error(err);
        res.status(400).json({errors: err.errors});
>>>>>>> origin/Tyler
        return;
    }
    data.vendorId = data.vendorId.trim();
    data.chargerId = data.chargerId.trim();
    data.name = data.name.trim();
    if (data.description) {
        data.description = data.description.trim();
    }
    data.address = data.address.trim();
    let result = await EVC.create(data);
    res.json(result);
});

// Get EVC Information (with Search)
<<<<<<< HEAD
router.get("/", async(req, res) => {
    let list = await finalEVC.findAll({
        order: [
            ['id', "ASC"]
        ]
=======
router.get("/", async (req, res)=> {
    let list = await finalEVC.findAll({
        order: [['id',"ASC"]]
>>>>>>> origin/Tyler
    });
    res.json(list)
});

// Get EVC by ID
<<<<<<< HEAD
router.get("/:id", async(req, res) => {
=======
router.get("/:id", async (req, res)=> {
>>>>>>> origin/Tyler
    let id = req.params.id;
    let evc = await finalEVC.findByPk(id);
    if (!evc) {
        res.sendStatus(404);
        return;
    }
    res.json(evc)
});
// Update EVC Info
<<<<<<< HEAD
router.put("/updateEVC/:id", async(req, res) => {
=======
router.put("/updateEVC/:id", async (req, res) => {
>>>>>>> origin/Tyler
    let id = req.params.id;
    let evc = await finalEVC.findByPk(id);
    if (!evc) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
<<<<<<< HEAD
    let num = await finalEVC.update(data, { where: { id: id } });
    if (num == 1) {
        res.json({
            message: "EVC Info was updated successfully."
        });
    } else {
=======
    let num = await finalEVC.update(data, {where: {id: id}});
    if (num == 1){
        res.json({
            message: "EVC Info was updated successfully."
        });
    }
    else {
>>>>>>> origin/Tyler
        res.status(400).json({
            message: `Cannot update EVC Info with id ${id}.`
        })
    }
});

// Delete EVC Info


module.exports = router;