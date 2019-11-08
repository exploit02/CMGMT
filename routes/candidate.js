const express = require('express')
const Candidate = require('../models/candidateModel')
const router = new express.Router()
var ObjectID = require('mongodb').ObjectID;

router.get('/', async(req, res, next)=>{
    Candidate.find({}, { name: 1, aadhar_no: 1, phone_number: 1, city: 1, bank_account: 1, _id: 1 })
    .then(candidates => {
        res.send(candidates);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
   
});

router.get('/byaadhar/:aadharNumber', async(req, res)=>{
    Candidate.findOne({aadhar_no: req.params.aadharNumber})
    .then(candidates => {
        console.log(candidates)
        if(candidates !== null){
            res.status(200).send(true);
        }else{
            res.status(200).send(false);
        }
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
})

router.get('/bygender', async(req, res, next)=>{
    
    const filter = [
        {aadhar_no: { $not: /null/ }}
    ]
    var createdAt = {};

    for (var key in req.query) {
        if(req.query[key] !== '' && (key !== 'todate' && key !== 'fromdate') )
            filter.push({[key]:new RegExp(["^", req.query[key], "$"].join(""), "i")});
        if(req.query[key] !== '' && (key === 'todate' || key === 'fromdate') )
        key === 'todate'?createdAt["$lte"] = new Date(req.query[key]):createdAt["$gte"] = new Date(req.query[key])
    }
    
    if(Object.keys(createdAt).length !== 0 && createdAt.constructor === Object){
        filter.push({"createdAt":createdAt})
    }
console.log(filter)
    Candidate.aggregate([
        { 
            $match: {
                $and: filter
           }
        },
        {"$group" : {_id:"$gender", count:{$sum:1}}}
    ])
    .then(candidates => {
        res.send(candidates);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
   
});

router.get('/bystatus', async(req, res, next)=>{
    const filter = [
        {aadhar_no: { $not: /null/ }}
    ]
    var createdAt = {};

    for (var key in req.query) {
        if(req.query[key] !== '' && (key !== 'todate' && key !== 'fromdate') )
            filter.push({[key]:new RegExp(["^", req.query[key], "$"].join(""), "i")});
        if(req.query[key] !== '' && (key === 'todate' || key === 'fromdate') )
        key === 'todate'?createdAt["$lte"] = new Date(req.query[key]):createdAt["$gte"] = new Date(req.query[key])
    }
    
    if(Object.keys(createdAt).length !== 0 && createdAt.constructor === Object){
        filter.push({"createdAt":createdAt})
    }
    Candidate.aggregate([
        { 
            $match: {
                 $and: filter
            }
        },
        {"$group" : {_id:"$status", count:{$sum:1}}}
    ])
    .then(candidates => {
        res.send(candidates);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
   
});

router.get('/byagegroup', async(req, res, next)=>{
    const filter = [
        {aadhar_no: { $not: /null/ }}
    ]
    var createdAt = {};

    for (var key in req.query) {
        if(req.query[key] !== '' && (key !== 'todate' && key !== 'fromdate') )
            filter.push({[key]:new RegExp(["^", req.query[key], "$"].join(""), "i")});
        if(req.query[key] !== '' && (key === 'todate' || key === 'fromdate') )
        key === 'todate'?createdAt["$lte"] = new Date(req.query[key]):createdAt["$gte"] = new Date(req.query[key])
    }
    
    if(Object.keys(createdAt).length !== 0 && createdAt.constructor === Object){
        filter.push({"createdAt":createdAt})
    }

    Candidate.aggregate([
        { 
            $match: {
                 $and: filter
            }
        },
        { 
            "$project": {
                "ageGroup": {
                    "$divide": [
                        {
                            "$subtract": [
                                new Date(),
                                { "$ifNull": ["$dob", new Date()] }
                            ]
                        },
                        1000 * 86400 * 365
                    ]
                }
            }
        },
        {
            "$group": {
                "_id": {
                    "$concat": [
                        { "$cond": [ { "$and": [ { "$gt":  ["$ageGroup", 0 ] }, { "$lt": ["$ageGroup", 10] } ]}, "Under 10Yrs", ""] },
                        { "$cond": [ { "$and": [ { "$gte": ["$ageGroup", 10] }, { "$lt": ["$ageGroup", 25] } ]}, "10Yrs - 25Yrs", ""] },
                        { "$cond": [ { "$and": [ { "$gte": ["$ageGroup", 25] }, { "$lt": ["$ageGroup", 40] } ]}, "25Yrs - 40Yrs", ""] },
                        { "$cond": [ { "$and": [ { "$gte": ["$ageGroup", 40] }, { "$lt": ["$ageGroup", 55] } ]}, "40Yrs - 55Yrs", ""] },
                        { "$cond": [ { "$and": [ { "$gte": ["$ageGroup", 55] }, { "$lt": ["$ageGroup", 70] } ]}, "55Yrs - 70Yrs", ""] },
                        { "$cond": [ { "$and": [ { "$gte": ["$ageGroup", 70] }, { "$lt": ["$ageGroup", 85] } ]}, "70Yrs - 85Yrs", ""] },
                        { "$cond": [ { "$gte": [ "$ageGroup", 85 ] }, "Over 85Yrs", ""] }
                    ]
                },
                "personCount": { "$sum": 1 }
            }
        },
        { "$project": { "_id": 0, "ageGroup": "$_id", "personCount": 1 } }
    ])
    .then(candidates => {
        res.send(candidates);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
   
});

router.get('/:id', async(req, res, next)=>{
    Candidate.findOne({_id: req.params.id})
    .then(candidates => {
        console.log(candidates)
        res.send(candidates);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
   
});



router.post('/' , async (req, res) => {
    
    const candidate = new Candidate(req.body)
    console.log(candidate)
    try {
        await candidate.save()
        res.status(201).send({candidate})
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

})


router.patch('/:id' , async (req , res) => {

    const id = req.params.id
    const CandidateOld = await Candidate.findById(id)
    const candidateObject = CandidateOld.toObject()
    candidateObject.versions = candidateObject.versions.concat({candidateObject});

    candidateObjectVersion = {
        _id: new ObjectID(),
        name: candidateObject.name,
        aadhar_no: candidateObject.aadhar_no,     
        dob: candidateObject.dob,
        phone_number: candidateObject.phone_number,      
        alternate_phone_number: candidateObject.alternate_phone_number,
        address_1: candidateObject.address_1,       
        address_2: candidateObject.address_2,
        city: candidateObject.city,
        state: candidateObject.state,
        country: candidateObject.country,
        gender: candidateObject.gender,
        source: candidateObject.source,
        source_type: candidateObject.source_type,
        employement_status: candidateObject.employement_status,
        occupation: candidateObject.occupation,
        annual_income: candidateObject.annual_income,
        educational_qualification: candidateObject.educational_qualification,
        successful_enterprises: candidateObject.successful_enterprises,
        failed_enterprises:candidateObject.failed_enterprises,
        bank_account: candidateObject.bank_account,
        credit_history: candidateObject.credit_history,
        has_assets: candidateObject.has_assets,
        needs_training: candidateObject.needs_training,
        status: candidateObject.status,
        email: candidateObject.email,
        createdAt: candidateObject.updatedAt,
        updatedAt: new Date()
    }

    CandidateOld.versions.push(candidateObjectVersion);

    try{

        const candidate = await Candidate.findByIdAndUpdate(id, req.body , 
            {new: true , runValidators: true})

        if(!candidate){
            return res.status(404).send()
        }else{
            
            const version = await Candidate.findByIdAndUpdate(id, {versions: CandidateOld.versions} , 
                {new: true , runValidators: true})
        }
        res.status(200).send(candidate)
    }catch(e){
        res.status(500).send(e)
    }
})



module.exports = router
