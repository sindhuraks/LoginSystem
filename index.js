const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const app = express();

// check connection to MongoDB database
mongoose.connect('mongodb://localhost:27017/users' , {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to MongoDB..'))
        .catch(err => console.log('Failed to connect to MongoDB..'));

app.use(express.json());

app.use('/',users);

const portNum = process.env.PORT || 2009;
app.listen(portNum,console.log(`Listening on port ${portNum}...`));

