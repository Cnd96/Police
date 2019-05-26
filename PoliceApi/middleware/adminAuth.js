const jwt=require('jsonwebtoken');

module.exports = function (req,res,next){

    const token=req.header('Admin-Auth-token');

    if(!token) return res.status(401).send('Access Denied');

    try{
        const decoded=jwt.verify(token,'TrafficPolicePrivateKey');
        req.user=decoded;
        next();

    }catch(ex){
        res.status(400).send('Invalid Token');
    }
}