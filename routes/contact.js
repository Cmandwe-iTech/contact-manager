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
    let singlecontact = await ContactModel.findOne({id:req.params._id});
    if(singlecontact){
        res.status(200).json({
            singlecontact
        })
    } else{
        res.status(404).json({
            error:"There is no contact with that id"
        })
    } 
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
})

contact_router.delete("/v1/contacts/:id", async(req, res)=>{
   try {
    const singlecontact = await ContactModel.findById({id:req.params._id})
    if(singlecontact){
     await ContactModel.deleteOne({id:req.params._id})
     res.status(204).json({
        none
     })
    }else{
        res.status(204).json({
            error:"contact doesn't exist with thid id"
        })
    }
   } catch (error) {
    error:"contact doesn't exist with thid id"
   }
})

contact_router.put("/v1/contacts/:id", async(req, res)=>{
    try {
        const contact = await ContactModel.findOne({id:req.params._id});
        console.log(contact);
        if(contact){
         const updated = await contact.updateOne({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                phone:req.body.phone
            })
            res.status(204).json({
                updated
            })
        }else{
            res.status(404).json({
                error: "There is no contact with that id"
            })
        }
    } catch (error) {
        res.status(404).json({
            error: "There is no contact with that id",
            message: error.message
        })
    }
})

contact_router.patch("/v1/contacts/:id", async(req, res)=>{
    try {
        const contact = await ContactModel.findOne({id:req.params._id});
        console.log(contact);
        if(contact){
         const updated = await contact.updateOne(req.body)
            res.status(204).json({
                none
            })
        }else{
            res.status(404).json({
                error: "There is no contact with that id"
            })
        }
    } catch (error) {
        res.status(404).json({
            error: "There is no contact with that id",
            message: error.message
        })
    }
})

module.exports = contact_router;