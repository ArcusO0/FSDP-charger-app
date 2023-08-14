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

const requestRoute = require("./routes/requests");
const evcRoute = require("./routes/evc");
const otherbookingRoute = require("./routes/booking");
app.use('/MyRequests', requestRoute);
app.use("/MyEVC", evcRoute);
app.use("/MyBookings", otherbookingRoute);
const userRoute = require('./routes/user');
app.use("/user", userRoute);

const feedbackRoute = require('./routes/userfeedback');
app.use("/userfeedback", feedbackRoute);
const bookingRoute = require('./routes/userbooking');
app.use("/userbooking", bookingRoute);
const oldbookingRoute = require('./routes/olduserbooking');
app.use("/olduserbooking", oldbookingRoute);

const vendorRoute = require('./routes/vendor');
app.use("/vendor", vendorRoute)

const fileRoute = require('./routes/file');
app.use("/file", fileRoute);


db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});