const express = require('express');
const router = express.Router();
const { bookings, Sequelize } = require('../models');
const yup = require("yup");
router.get("/", async(req, res) => {

    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [{
                bookingID: {
                    [Sequelize.Op.like]: `%${search}%`
                }
            },
            {
                address: {
                    [Sequelize.Op.like]: `%${search}%`
                }
            }
        ];
    }

    let list = await Tutorial.findAll({
        where: condition,
        order: [
            ['bookingDate', 'DESC']
        ],
        include: { model: charger, as: "charger", attributes: ['name'] }
    });
    res.json(list);
});

module.exports = router;