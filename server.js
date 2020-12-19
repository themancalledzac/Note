const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

// const notesData = require('./data/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// this should be able to load all files in that directory? or will i need to do it for each folder within?
app.use(express.static('public'));
// app.use(express.static('routes'));


require("./routes/apiRoutes")(app);
// go second to remove the * fropm hitting first
require("./routes/htmlRoutes")(app);
// require("./data/db.json")(app);


app.listen( PORT );

// http://localhost:3002/