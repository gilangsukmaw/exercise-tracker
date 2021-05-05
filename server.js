const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb database connect succesfully");
});

const exerciseroutes = require('./routes/exercises');
const usersroutes = require('./routes/users');

app.use('/exercise', exerciseroutes);
app.use('/users', usersroutes);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});