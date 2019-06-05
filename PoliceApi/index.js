const mongoose = require('mongoose');
const express = require('express');
const app = express();

const users=require('./routes/users');
const login=require('./routesLogin/login');
const offences=require('./routes/offences');
const drivers=require('./routes/drivers');
const ranks=require('./routes/ranks');
const policeStations=require('./routes/policeStations');
const serachPoliceStations=require('./routseSearch/serachPoliceStations');
const policeStationLogin=require('./routesLogin/policeStationLogin');
const policemenLogin=require('./routesLogin/policemenLogin');
const policemen=require('./routes/policemen');
const searchPoliceman=require('./routseSearch/searchPoliceman');
const oicDivisions=require('./routes/oicDivisions');
const fines=require('./routes/fines');
const counters=require('./routes/counters');
const driverFines=require('./routes/driverFines');
const customer=require('./routes/customer');
const testReport=require('./routesReport/testReport');

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
app.use('/api/policemenLogin',policemenLogin);
app.use('/api/policemen',policemen);
app.use('/api/oicDivisions',oicDivisions);
app.use('/api/searchPoliceman',searchPoliceman);
app.use('/api/fines',fines);
app.use('/api/counters',counters);
app.use('/api/driverFines',driverFines);
app.use('/api/customer',customer);
app.use('/api/testReport',testReport);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));