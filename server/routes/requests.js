const { finalRequests, Sequelize } = require("../models");
const express = require("express");
const router = express.Router();
const yup = require("yup");

// Create "Add" and "Delete" Requests
router.post("/addRequest", async(req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        reqId: yup.string().min(0).required(),
        addOrDelete: yup.boolean().required(),
        name: yup.string().trim().min(3).max(100).required(),
        address: yup.string().trim().min(3).max(500).required(),
        rate: yup.number().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value + "").match(/^\d*\.{1}\d{2}$/)),
        description: yup.string().trim().min(3).max(500),
        status: yup.string().oneOf(["Pending", "Approved", "Rejected"]).required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false, strict: true })
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.reqId = data.reqId.trim();
    data.name = data.name.trim();
    data.status = data.status.trim();
    data.address = data.address.trim();
    if (data.description) {
        data.description = data.description.trim();
    }
    let result = await finalRequests.create(data);
    res.json(result);
});

// Get all Requests
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
    });
    res.json(list);
});

// Get by ID 
router.get("/:id", async(req, res) => {
    let id = req.params.id;
    let request = await finalRequests.findByPk(id);
    if (!request) {
        res.sendStatus(404);
        return;
    }
    res.json(request);
});

// Get by Type of Request
router.get("/:type", async(req, res) => {
    let type = req.params.type;
    let request = await Request.findAll(type);
    if (!request) {
        res.sendStatus(404);
        return;
    }
});

// Update Requests using Put
router.put("/updateRequest/:id", async(req, res) => {
    let id = req.params.id;
    let request = await Request.findByPk(id);
    if (!request) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    let validationSchema = yup.object().shape({
        type: yup.string().trim().min(3).max(100).required(),
        name: yup.string().trim().min(3).max(100).required(),
        status: yup.string().trim().min(3).max(100).required(),
        rate: yup.string().test('is-decimal', 'Invalid rate, enter a decimal value with 2 decimal places', (value) => (value + "").match(/^\d*\.{1}\d{0,2}$/)),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false, strict: true })
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.type = data.type.trim();
    data.name = data.name.trim();
    data.status = data.status.trim();
    let num = await Request.update(data, { where: { id: id } });
    if (num == 1) {
        res.json({
            message: "Request was updated successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot update request with id ${id}.`
        })
    }
});
router.put("/updateRequest/accept/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const request = await finalRequests.findByPk(id);

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Update the status field to "Accepted"
        request.status = 'Accepted';
        await request.save();

        return res.status(200).json({ message: 'Request status updated to Accepted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the request status' });
    }
});

router.put("/updateRequest/reject/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const request = await finalRequests.findByPk(id);

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Update the status field to "Accepted"
        request.status = 'Rejected';
        await request.save();

        return res.status(200).json({ message: 'Request status updated to Accepted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the request status' });
    }
});


// Delete Requests 
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