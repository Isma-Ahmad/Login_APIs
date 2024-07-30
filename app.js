const express = require("express");
const app = express();
const sequelize = require("sequelize");
const dotenv = require("dotenv").config()
const db = require("./models");
const userRoutes = require("./routes/userRoutes");
const PORT = 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRoutes);

app.listen(PORT , ()=> console.log(`Server is start on Port no ${PORT}`));