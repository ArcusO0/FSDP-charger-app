const express = require('express');
const router = express.Router();
const { bookings, Sequelize } = require('../models');
const yup = require("yup");
router.get("/", async(req, res) => {

    let list = await charger.findAll({
        order: [
            ['bookingDate', 'DESC']
        ]
    });
    res.json(list);
});

module.exports = router;