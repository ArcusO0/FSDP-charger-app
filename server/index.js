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
const feedbackRoute = require('./routes/userfeedback');
app.use("/userfeedback", feedbackRoute);
const bookingRoute = require('./routes/userbooking');
app.use("/userbooking", bookingRoute);
const oldbookingRoute = require('./routes/olduserbooking');
app.use("/olduserbooking", oldbookingRoute);

const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});