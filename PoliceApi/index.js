const mongoose = require('mongoose');
const express = require('express');
const app = express();

const users=require('./routes/users');
const login=require('./routes/login');
const offences=require('./routes/offences');
const drivers=require('./routes/drivers');
const ranks=require('./routes/ranks');
const policeStations=require('./routes/policeStations');
const serachPoliceStations=require('./routes/serachPoliceStations');
const policeStationLogin=require('./routes/policeStationLogin');
const policemen=require('./routes/policemen');
const searchPoliceman=require('./routes/searchPoliceman');
const oicDivisions=require('./routes/oicDivisions');
const fines=require('./routes/fines');


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
      "GET,PUT, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
   
app.use(express.json());
app.use('/api/users',users);
app.use('/api/login',login);
app.use('/api/offences',offences);
app.use('/api/drivers',drivers);
app.use('/api/ranks',ranks);
app.use('/api/serachPoliceStations',serachPoliceStations);
app.use('/api/policeStations',policeStations);
app.use('/api/policeStationLogin',policeStationLogin);
app.use('/api/policemen',policemen);
app.use('/api/oicDivisions',oicDivisions);
app.use('/api/searchPoliceman',searchPoliceman);
app.use('/api/fines',fines);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));