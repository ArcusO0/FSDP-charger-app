<<<<<<< HEAD
const { finalRequests, Sequelize } = require("../models");
=======
const { finalRequest, Sequelize } = require("../models"); 
>>>>>>> origin/Tyler
const express = require("express");
const router = express.Router();
const yup = require("yup");

// Create "Add" and "Delete" Requests
<<<<<<< HEAD
router.post("/addRequest", async(req, res) => {
=======
router.post("/addRequest", async (req, res) => {
>>>>>>> origin/Tyler
    let data = req.body;
    let validationSchema = yup.object().shape({
        reqId: yup.string().min(0).required(),
        addOrDelete: yup.boolean().required(),
        name: yup.string().trim().min(3).max(100).required(),
        address: yup.string().trim().min(3).max(500).required(),
<<<<<<< HEAD
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value + "").match(/^\d*\.{1}\d{2}$/)),
=======
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value+"").match(/^\d*\.{1}\d{2}$/)),
>>>>>>> origin/Tyler
        description: yup.string().trim().min(3).max(500),
        status: yup.string().oneOf(["Pending", "Approved", "Rejected"]).required()
    });
    try {
<<<<<<< HEAD
        await validationSchema.validate(data, { abortEarly: false, strict: true })
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
=======
        await validationSchema.validate(data, 
            { abortEarly: false, strict: true} )
    } 
    catch (err) {
        console.error(err);
        res.status(400).json({errors: err.errors});
>>>>>>> origin/Tyler
        return;
    }
    data.reqId = data.reqId.trim();
    data.name = data.name.trim();
    data.status = data.status.trim();
    data.address = data.address.trim();
    if (description) {
        data.description = data.description.trim
    }
<<<<<<< HEAD
    let result = await finalRequests.create(data);
=======
    let result = await finalRequest.create(data);
>>>>>>> origin/Tyler
    res.json(result);
});

// Get all Requests
<<<<<<< HEAD
router.get("/", async(req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [{
                type: {
                    [Sequelize.Op.like]: `${search}%`
                }
            },
            {
                name: {
                    [Sequelize.Op.like]: `${search}%`
                }
            },
            {
                status: {
                    [Sequelize.Op.like]: `${search}%`
                }
            }
        ];
    }
    let list = await finalRequests.findAll({
        where: condition,
        order: [
            ['id', 'ASC']
        ]
=======
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
    let list = await finalRequest.findAll({
        where: condition,
        order: [['id', 'ASC']]
>>>>>>> origin/Tyler
    });
    res.json(list);
});

// Get by ID 
<<<<<<< HEAD
router.get("/:id", async(req, res) => {
    let id = req.params.id;
    let request = await finalRequests.findByPk(id);
=======
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let request = await finalRequest.findByPk(id);
>>>>>>> origin/Tyler
    if (!request) {
        res.sendStatus(404);
        return;
    }
    res.json(request);
});

// Get by Type of Request
<<<<<<< HEAD
router.get("/:type", async(req, res) => {
    let type = req.params.type;
    let request = await Request.findAll(type);
    if (!request) {
=======
router.get("/:type", async (req, res) => {
    let type = req.params.type;
    let request = await Request.findAll(type);
    if(!request) {
>>>>>>> origin/Tyler
        res.sendStatus(404);
        return;
    }
});

// Update Requests using Put
<<<<<<< HEAD
router.put("/updateRequest/:id", async(req, res) => {
    let id = req.params.id;
    let request = await Request.findByPk(id);
    if (!request) {
=======
router.put("/updateRequest/:id", async (req, res) => {
    let id = req.params.id;
    let request = await Request.findByPk(id);
    if(!request){
>>>>>>> origin/Tyler
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    let validationSchema = yup.object().shape({
        type: yup.string().trim().min(3).max(100).required(),
        name: yup.string().trim().min(3).max(100).required(),
        status: yup.string().trim().min(3).max(100).required(),
<<<<<<< HEAD
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value + "").match(/^\d*\.{1}\d{0,2}$/)),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false, strict: true })
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
=======
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value+"").match(/^\d*\.{1}\d{0,2}$/)),
    });
    try {
        await validationSchema.validate(data, 
            { abortEarly: false, strict: true} )
    } 
    catch (err) {
        console.error(err);
        res.status(400).json({errors: err.errors});
>>>>>>> origin/Tyler
        return;
    }
    data.type = data.type.trim();
    data.name = data.name.trim();
    data.status = data.status.trim();
<<<<<<< HEAD
    let num = await Request.update(data, { where: { id: id } });
    if (num == 1) {
        res.json({
            message: "Request was updated successfully."
        });
    } else {
=======
    let num = await Request.update(data, {where: {id:id}});
    if (num == 1){
        res.json({
            message: "Request was updated successfully."
        });
    }
    else {
>>>>>>> origin/Tyler
        res.status(400).json({
            message: `Cannot update request with id ${id}.`
        })
    }
});

// Delete Requests 
<<<<<<< HEAD
router.delete("/deleteRequest/:id", async(req, res) => {
    let id = req.params.id;
    let num = await Request.destroy({ where: { id: id } })
    if (num == 1) {
        res.json({ message: "Request was deleted successfully." });
    } else {
        res.json({ message: `Cannot delete Request with id ${id}` })
    }
});

module.exports = router;
=======
router.delete("/deleteRequest/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Request.destroy({ where: {id:id}})
    if (num == 1) {
        res.json({message: "Request was deleted successfully."});
    }
    else {
        res.json({message: `Cannot delete Request with id ${id}`})
    }
});

module.exports = router;
>>>>>>> origin/Tyler
