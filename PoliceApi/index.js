const mongoose = require('mongoose');
const express = require('express');
const app = express();

const users=require('./routes/users');
const login=require('./routes/login');
const offences=require('./routes/offences');
const drivers=require('./routes/drivers');

mongoose.connect('mongodb://localhost/TrafficPolice',{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use(express.json());
app.use('/api/users',users);
app.use('/api/login',login);
app.use('/api/offences',offences);
app.use('/api/drivers',drivers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));