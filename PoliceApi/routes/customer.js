const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

router.post('/', async (req, res) => {

    
    const useNewUrlParser = "mongodb://localhost:27017/";

    MongoClient.connect(useNewUrlParser, function(err, db) {
     if (err) throw err;
     var dbo = db.db("TrafficPolice");
    var myobj = { name: req.body.name, address: req.body.address ,game:req.body.game};
    dbo.collection("customers").insertOne(myobj, function(err, res) {
         if (err) throw err;
      console.log("1 document inserted");
      db.close();
     });
    });
 
   
    
    res.send();
  });


module.exports = router; 
