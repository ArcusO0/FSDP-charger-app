const { finalRequests, Sequelize } = require("../models"); 
const express = require("express");
const router = express.Router();
const yup = require("yup");

// Create "Add" and "Delete" Requests
router.post("/addRequest", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        addOrDelete: yup.boolean(),
        type: yup.string().oneOf(["Add", "Delete"]).required(),
        name: yup.string().trim().min(3).max(100).required(),
        address: yup.string().trim().min(3).max(500).required(),
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value+"").match(/^\d*\.{1}\d*$/)),
        description: yup.string().trim().min(3).max(500),
        status: yup.string().oneOf(["Pending", "Approved", "Rejected"]).required()
    });
    try {
        await validationSchema.validate(data, 
            { abortEarly: false, strict: true} )
    } 
    catch (err) {
        console.error(err);
        res.status(400).json({errors: err.errors});
        return;
    }
    data.name = data.name.trim();
    data.status = data.status.trim();
    data.address = data.address.trim();
    if (data.description) {
        data.description = data.description.trim()
    }
    let result = await finalRequests.create(data);
    res.json(result);
});

// Get all Requests
router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            {type: {[Sequelize.Op.like]: `${search}%`}},
            {name: {[Sequelize.Op.like]: `${search}%`}},
            {status: {[Sequelize.Op.like]: `${search}%`}}
        ];
    }
    let list = await finalRequests.findAll({
        where: condition,
        order: [['id', 'ASC']]
    });
    res.json(list);
});

// Get by ID 
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let request = await finalRequests.findByPk(id);
    if (!request) {
        res.sendStatus(404);
        return;
    }
    res.json(request);
});

// Update Requests using Put
router.put("/updateRequest/:id", async (req, res) => {
    let id = req.params.id;
    let request = await finalRequests.findByPk(id);
    if(!request){
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    let validationSchema = yup.object().shape({
        type: yup.string().trim().min(3).max(100),
        name: yup.string().trim().min(3).max(100),
        address: yup.string().trim().min(3).max(200),
        description: yup.string().trim().min(3).max(500),
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value+"").match(/^\d*\.{1}\d*$/) ),
    });
    try {
        await validationSchema.validate(data, 
            { abortEarly: false, strict: true} )
    } 
    catch (err) {
        console.error(err);
        res.status(400).json({errors: err.errors});
        return;
    }
    let num = await finalRequests.update(data, {where: {id:id}});
    if (num == 1){
        res.json({
            message: "Request was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update request with id ${id}.`
        })
    }
});

// Delete Requests 
router.delete("/deleteRequest/:id", async (req, res) => {
    let id = req.params.id;
    let num = await finalRequests.destroy({ where: {id:id}})
    if (num == 1) {
        res.json({message: "Request was deleted successfully."});
    }
    else {
        res.json({message: `Cannot delete Request with id ${id}`})
    }
});

module.exports = router;
