const express = require('express');
const router = express.Router();
const { chargers, Sequelize } = require('../models');
const yup = require("yup");

router.get("/", async(req, res) => {

    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [{
                name: {
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

    let list = await chargers.findAll({
        where: condition,
        order: [
            ['createdAt', 'DESC']
        ],
    });
    res.json(list);
});

router.post("/", async(req, res) => {

    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({

        name: yup.string().trim().min(3).max(100).required(),
        rating: yup.number().min(0).max(5).required(),
        address: yup.string().trim().min(3).max(100).required(),
        noOfBookings: yup.number().min(0).required(),
        bookingRate: yup.number().min(0).required()
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
    let result = await chargers.create(data);
    res.json(result);
});

module.exports = router;