const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to our FSDP Project.");
});

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
app.use('/requests', requestRoute);
app.use("/evc", evcRoute);

