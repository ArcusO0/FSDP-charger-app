const express = require('express');
const cors = require('cors');
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});

// Routes
const requests = require('./routes/requests');
app.use("/requests", requests);
const bookings = require('./routes/bookings');
app.use("/bookings", bookings);
const chargers = require('./routes/chargers');
app.use("/chargers", chargers);

const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});
res.send("Welcome to our FSDP Project.");


require('dotenv').config();
db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡Server running on http://localhost:${port}`);
    });
});

// Routes

const requestRoute = require("./routes/requests");
const evcRoute = require("./routes/evc");
const bookingRoute = require("./routes/booking");
app.use('/MyRequests', requestRoute);
app.use("/MyEVC", evcRoute);
app.use("/MyBookings", bookingRoute);