const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to plugshare.");
});

// Routes
const bookingpageRoute = require('./routes/bookingpage');
app.use("/bookingpage", bookingpageRoute);
const timerRoute = require('./routes/timer');
app.use("/timer", timerRoute);
const historyRoute = require('./routes/history');
app.use("/history", historyRoute);
const feedbackRoute = require('./routes/feedback');
app.use("/feedback", feedbackRoute);

const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});