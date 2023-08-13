const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to our FSDP Project.");
});

require('dotenv').config();


// Routes
<<<<<<< HEAD
const requests = require('./routes/requests');
app.use("/requests", requests);
const bookings = require('./routes/bookings');
app.use("/bookings", bookings);
const chargers = require('./routes/chargers');
app.use("/chargers", chargers);
const feedbackRoute = require('./routes/feedback');
app.use("/feedback", feedbackRoute);
const bookingRoute = require('./routes/booking');
app.use("/booking", bookingRoute);
const feedbackRoute = require('./routes/userfeedback');
app.use("/userfeedback", feedbackRoute);
const bookingRoute = require('./routes/userbooking');
app.use("/userbooking", bookingRoute);
const oldbookingRoute = require('./routes/olduserbooking');
app.use("/olduserbooking", oldbookingRoute);
=======

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

const fileRoute = require('./routes/file');
app.use("/file", fileRoute);

>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421

db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});