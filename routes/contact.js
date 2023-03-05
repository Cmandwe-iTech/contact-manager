const express = require('express');
const ContactModel = require('../models/user');
const contact_router = express.Router();

contact_router.post("/v1/contacts", async(req, res)=>{
    try {
const details = await ContactModel.create({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    phone:req.body.phone
})
    res.status(201).json({
        details
    })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
})

contact_router.get("/v1/contacts", async(req, res)=>{
    try {
    const details = await ContactModel.find();
        res.status(200).json({
            details
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }

})

contact_router.get("/v1/contacts/:id", async(req, res)=>{
    try {
    let singlecontact = await ContactModel.findOne({_id:req.params.id});
        res.status(200).json({
            singlecontact
        })
    } catch (error) {
        res.status(404).json({
            message:"There is no contact with that id"
        })
    }
})

contact_router.delete("/v1/contacts/:id", async(req, res)=>{
   try {
     await ContactModel.deleteOne({_id:req.params.id})
     res.status(204).json({
        status:"success"
     })
   } catch (error) {
    message:"contact doesn't exist with thid id"
   }
})

contact_router.put("/v1/contacts/:id", async(req, res)=>{
    try {
          await ContactModel.updateOne({_id:req.params.id}, req.body)
          console.log("hiii")
            res.status(204).json({
                status:"success"
            })        
    } catch (error) {
        res.status(404).json({
            message: "There is no contact with that id",
        })
    }
})

contact_router.patch("/v1/contacts/:id", async(req, res)=>{
    try {
        await ContactModel.updateOne({_id:req.params.id}, {$set:{firstName:req.body.firstName}})
            res.status(204).json({
                status:"success"
            })
    } catch (error) {
        res.status(404).json({
            message: "There is no contact with that id",
        })
    }
})

module.exports = contact_router;