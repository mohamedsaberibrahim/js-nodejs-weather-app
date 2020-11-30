const path = require('path');
const express = require('express');
const { json } = require('express');
var hbs = require('hbs');
const app = express();
const router = require('./app/router');
const hbsHelpers = require('./app/views/helpers');

app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.use(express.static("public"));


hbs.registerHelper('prettifyDate', hbsHelpers.prettifyDate);
hbs.registerHelper('round', hbsHelpers.round);

app.set("views", "./app/views");

app.set("view engine", "hbs");

app.use("/", router);


app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on Port 3000!");
});
