require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./routes/users");
const csvFile = require("./routes/csvFile");

app.use("/api/v1/", users);
app.use("/api/v1/", csvFile);

const dbConnect = require('./lib/db');
dbConnect();



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
