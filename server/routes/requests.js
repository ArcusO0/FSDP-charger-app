const { Request, Sequelize } = require("../models"); 
const express = require("express");
const router = express.Router();
const yup = require("yup");

// Create "Add" and "Delete" Requests
router.post("/addRequest", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        type: yup.string().oneOf(['Add', 'Delete']).required(),
        name: yup.string().trim().min(3).max(100).required(),
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
    data.type = data.type.trim();
    data.name = data.name.trim();
    data.status = data.status.trim();
    let result = await Request.create(data);
    res.json(result);
});

// Get all Requests
router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            {name: {[Sequelize.Op.like]: `${search}%`}},
            {status: {[Sequelize.Op.like]: `${search}%`}}
        ];
    }
    let list = await Request.findAll({
        where: condition,
        order: [['id', 'ASC']]
    });
    res.json(list);
});

// Get by ID 
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let request = await Request.findByPk(id);
    if (!request) {
        res.sendStatus(404);
        return;
    }
    res.json(request);
});

// Get by Type of Request
router.get("/:type", async (req, res) => {
    let type = req.params.type;
    let request = await Request.findAll(type);
    if(!request) {
        res.sendStatus(404);
        return;
    }
});

// Update Requests using Put
router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let request = await Request.findByPk(id);
    if(!request){
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    let validationSchema = yup.object().shape({
        type: yup.string().trim().min(3).max(100).required(),
        name: yup.string().trim().min(3).max(100).required(),
        status: yup.string().trim().min(3).max(100).required()
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
    data.type = data.type.trim();
    data.name = data.name.trim();
    data.status = data.status.trim();
    let num = await Request.update(data, {where: {id:id}});
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
    let num = await Request.destroy({ where: {id:id}})
    if (num == 1) {
        res.json({message: "Request was deleted successfully."});
    }
    else {
        res.json({message: `Cannot delete Request with id ${id}`})
    }
});

module.exports = router;
