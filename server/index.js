const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});

// Routes
const requestRoute = require("./routes/requests");
const evcRoute = require("./routes/evc");
const bookingRoute = require("./routes/booking");
app.use('/MyRequests', requestRoute);
app.use("/MyEVC", evcRoute);
app.use("/MyBookings", bookingRoute);
const userRoute = require('./routes/user');
app.use("/user", userRoute);

const vendorRoute = require('./routes/vendor');
app.use("/vendor", vendorRoute)

const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});