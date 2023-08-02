const { EVC, Sequelize } = require("../models"); 
const express = require("express");
const router = express.Router();
const yup = require("yup");

// Create EVC Information
router.post("/addEVC", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        vendorId: yup.string().trim().min(5).max(5).required(),
        chargerId: yup.string().trim().min(5).max(5).required(),
        name: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().max(500),
        address: yup.string().trim().min(3).max(500).required(),
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value+"").match(/^\d*\.{1}\d{0,2}$/)).required(),
        rating: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 1 decimal place', (value) => (value+"").match(/^\d*\.{1}\d?$/)).required(),
        status: yup.string().oneOf(["Good", "Poor", "Critical"]).required()
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
router.get("/", async (req, res)=> {
    let list = await EVC.findAll({
        order: [['id',"ASC"]]
    });
    res.json(list)
});

// Get EVC by ID
router.get("/:id", async (req, res)=> {
    let id = req.params.id;
    let evc = await EVC.findByPk(id);
    if (!evc) {
        res.sendStatus(404);
        return;
    }
    res.json(evc)
});
// Update EVC Info
router.put("/updateEVC/:id", async (req, res) => {
    let id = req.params.id;
    let evc = await EVC.findByPk(id);
    if (!evc) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    let num = await EVC.update(data, {where: {id: id}});
    if (num == 1){
        res.json({
            message: "EVC Info was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update EVC Info with id ${id}.`
        })
    }
});

// Delete EVC Info


module.exports = router;