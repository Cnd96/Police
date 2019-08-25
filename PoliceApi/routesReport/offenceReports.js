const {Fine} = require('../models/fine'); 
const {CourtCase} = require('../models//courtCase'); 
const {Offence} =require('../models/offence');
const request=require('request');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
        let monthQuery=req.query.month;
        let yearQuery=req.query.year;
  
        let finesListOfSelectedMonth=[];
        let courtListOfSelectedMonth=[];
        let allCasesOfSelectedMonth=[];
        //finding all fines in one month
        let fines =await Fine.aggregate([
            {
                $project:{
                    offences:1,
                    date:1
                }
            },
        ]);

        let courtCases =await CourtCase.aggregate([
            {
                $project:{
                    offences:1,
                    date:1
                }
            },
        ]);

        courtCases.forEach(courtCase=>{
            if(new Date(courtCase.date).getMonth()==parseInt(monthQuery)){
                if(new Date(courtCase.date).getFullYear()==parseInt(yearQuery)){
                        
                    courtListOfSelectedMonth.push(courtCase);
                }  
            }
        })
        fines.forEach(fine=>{
            if(new Date(fine.date).getMonth()==parseInt(monthQuery)){
                if(new Date(fine.date).getFullYear()==parseInt(yearQuery)){
                        
                    finesListOfSelectedMonth.push(fine);
                }  
            }
        })

        allCasesOfSelectedMonth=courtListOfSelectedMonth.concat(finesListOfSelectedMonth);
        let offenceList=[];//offence ist to send
        let offences=await Offence.find();


        //Iterating through offences
        offences.forEach(offence=>{
            let total=0;
            //Iterating through monthly fines
            allCasesOfSelectedMonth.forEach(cases=>{
                //Iterating through offences of monthly fines to get the total 
                cases.offences.forEach(fineOffence=>{
                    if(fineOffence.provision==offence.provision){
                        total++;
                        // console.log(total)
                    }   
                })   
            })
            // console.log(offence.provision)
            let offenceToPush={
                sectionOfAct:offence._id,
                provision:offence.provision,
                total:total
            }
            offenceList.push(offenceToPush)
        })

        // let data={
        //     template:{'shortid': 'SyeaS4TlQr'},
        //     data:{
        //         "month": "March",
        //         "year": "2019",
        //         "offences": offenceList
        //     },
        //     options:{
        //         preview:true
        //     }
        // }
        // var options={
        //     url:'http://localhost:5488/api/report',
        //     method:'POST',
        //     json:data
        // }
        // request(options).pipe(res);
    res.send(offenceList);
  });

  
router.get('/all', async (req, res) => {

    let allCases=[];
    let fines =await Fine.aggregate([
        {
            $project:{
                offences:1,
            }
        },
        { $sort : { date : 1 } }
    ]);

    let courtCases =await CourtCase.aggregate([
        {
            $project:{
                offences:1,
            }
        },
    ]);

    allCases=courtCases.concat(fines);
    let offenceList=[];//offence list to send
    let offences=await Offence.find();


    //Iterating through offences
    offences.forEach(offence=>{
        let total=0;
        //Iterating through fines
        allCases.forEach(eachCase=>{
            //Iterating through offences of fines to get the total 
            eachCase.offences.forEach(fineOffence=>{
                if(fineOffence.provision==offence.provision){
                    total++;
                    // console.log(total)
                }   
            })   
        })
        // console.log(offence.provision)
        let offenceToPush={
            sectionOfAct:offence._id,
            provision:offence.provision,
            total:total
        }
        offenceList.push(offenceToPush)
    })
res.send(offenceList);
});

router.post('/getByPlace/basic', async (req, res) => {
    let placesToSearch=req.body.places;
    let policeStation=req.body.policeStation;
    let dataToSend=[];
    let allCases=[];
    let fines =await Fine.aggregate([
        {
            $project:{
                place:1,
                offences:1,
            }
        },
    ]);
    let courtCases =await CourtCase.aggregate([
        {$match:{policeStationName: policeStation}},
        {
            $project:{
                offences:1,
                place:1
            }
        },
    ]);

    fines.forEach(fine=>{
        fine.place=fine.place.toLowerCase();
    })
    courtCases.forEach(courtCase=>{
        courtCase.place=courtCase.place.toLowerCase();
    })
    allCases=courtCases.concat(fines);

    placesToSearch.forEach(place=>{
        let placeData={
            name:place,
            noOffences:0
        }
        allCases.forEach(eachCase=>{
            if(eachCase.place.includes(place)){
                placeData.noOffences=placeData.noOffences + eachCase.offences.length;
                // dataToSend.push(eachCase);
            }
        })
        dataToSend.push(placeData);
    })

    res.send(dataToSend);
})

router.post('/getByPlace', async (req, res) => {
    let placesToSearch=req.body.places;
    let policeStation=req.body.policeStation;
    let dataToSend=[];
    let allCases=[];
    //getting all fines 

    let fines =await Fine.aggregate([
        {$match:{policeStationName: policeStation}},
        {
            $project:{
                place:1,
                offences:1,
            }
        },
    ]);
    //getting all court cases 
    let courtCases =await CourtCase.aggregate([
        {$match:{policeStationName: policeStation}},
        {
            $project:{
                offences:1,
                place:1
            }
        },
    ]);

    let offences=await Offence.find();
    //places of all fines to lowercase 
    fines.forEach(fine=>{
        fine.place=fine.place.toLowerCase();
    })
    //places of all court cases to lowercase
    courtCases.forEach(courtCase=>{
        courtCase.place=courtCase.place.toLowerCase();
    })
    //concating all fines and all court cases
    allCases=courtCases.concat(fines);

    //iterating through all places by client
    placesToSearch.forEach(place=>{
        //place data template
        let placeData={
            name:place,
            offencesData:[]
        }
        
        let placeOffences=[];
        //iterating through all cases
        allCases.forEach(eachCase=>{
            //matching places in all cases and client request
            if(eachCase.place.includes(place)){
                // pushing eachcase offences to place offences
                eachCase.offences.forEach(offence=>{
                    placeOffences.push(offence);
                })
            }
        })

        offences.forEach(offence=>{
            let total=0;
            //Iterating through place all offences
            placeOffences.forEach(placeOffence=>{

                if(placeOffence.provision==offence.provision){
                    total++;
                }   
     
            })
            // console.log(offence.provision)
            let offenceToPush={
                sectionOfAct:offence._id,
                provision:offence.provision,
                total:total
            }
            placeData.offencesData.push(offenceToPush)
        })

        dataToSend.push(placeData);
    })

    res.send(dataToSend);
})


router.post('/getByPlace/withTime', async (req, res) => {
    let times=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23' ];
    let placesToSearch=req.body.places;
    let policeStation=req.body.policeStation;
    let dataToSend=[];
    let allCases=[];
    console.log(placesToSearch)
    //getting all fines 

    let fines =await Fine.aggregate([
        {$match:{policeStationName: policeStation}},
        {
            $project:{
                place:1,
                offences:1,
                time:1
            }
        },
    ]);
    //getting all court cases 
    let courtCases =await CourtCase.aggregate([
        {$match:{policeStationName: policeStation}},
        {
            $project:{
                offences:1,
                place:1,
                time:1
            }
        },
    ]);

    let offences=await Offence.find();
    //places of all fines to lowercase 
    fines.forEach(fine=>{
        fine.place=fine.place.toLowerCase();
    })
    //places of all court cases to lowercase
    courtCases.forEach(courtCase=>{
        courtCase.place=courtCase.place.toLowerCase();
    })
    //concating all fines and all court cases
    allCases=courtCases.concat(fines);

    //iterating through all places by client
    placesToSearch.forEach(place=>{
        //place data template
        let placeData={
            name:place,
            offencesData:[]
        }
        
        let placeFinesAndCases=[];
        //iterating through all cases
        allCases.forEach(eachCase=>{
            //matching places in all cases and client request
            if(eachCase.place.includes(place)){
                // pushing eachcase offences to place offences
                eachCase.offences.forEach(offence=>{
                    let placeFineAndCase={
                        offence:offence,
                        time:eachCase.time
                    }
                    placeFinesAndCases.push(placeFineAndCase);
                })
            }
        })

        offences.forEach(offence=>{
            let timeData=[];
            times.forEach(time=>{
               
                let total=0;
                placeFinesAndCases.forEach(placeFineAndCase=>{

                    if(placeFineAndCase.offence.provision==offence.provision){
                        
                        if(placeFineAndCase.time.startsWith(time)){
                            // console.log(placeFineAndCase.time+","+time)
                            total++;
                           
                        }
                    }   
                })
                let timeUpperLimitNumber = parseInt(time)+1;
                let formattedTimeUpperLimit = ("0" + timeUpperLimitNumber).slice(-2);
                let timeDataToPush={
                    time:time+"hrs-"+formattedTimeUpperLimit+"hrs",
                    total:total
                }
                timeData.push(timeDataToPush);
            })
            //Iterating through place all offences
           
            // console.log(offence.provision)
            let offenceToPush={
                sectionOfAct:offence._id,
                provision:offence.provision,
                timeData:timeData
            }
            placeData.offencesData.push(offenceToPush)
        })

        dataToSend.push(placeData);
    })

    res.send(dataToSend);
})


module.exports = router;  

