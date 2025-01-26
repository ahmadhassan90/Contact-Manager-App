const asyncHandler = require("express-async-handler")
const Contact = require("../Models/contactModel");
//@desc Get All contacts 
//@route GET api/contacts
//@access private
const getContacts = asyncHandler(async(req,res)=>
    {
        
        const contacts = await Contact.find({user_id : req.user.id});
        res.status(200).json(contacts);
    });

//@desc  Create new contact 
//@route POST api/contacts
//@access private
const createContact = asyncHandler (async(req,res)=>
    {
            console.log("The request body is",req.body);
            const {name,email,phone}= req.body;
            if(!email || !name || !phone)
            {
                res.status(400);
                throw new Error("All fields are mandatory");
            }
            const contact = await Contact.create({

                name,
                email,
                phone,
                user_id: req.user.id

            });
            res.status(201).json(contact);
    });

//@desc  Update contact 
//@route PUT api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req,res)=>
    {
        const contact = await Contact.findById(req.params.id)

        if(!contact)
        {
            res.status(404);
            throw new Error("Contact Not Found");
        }
        if(contact.user_id.toString() != req.user.id)
        {
            res.status(403);
            throw new Error("Not allowed to change another user contact");

        }
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true});

            res.status(200).json(updatedContact);
    });

//@desc Get  contact 
//@route GET api/contacts/:id
//@access public
const getContact = asyncHandler(async(req,res)=>
    {
            const contact = await Contact.findById(req.params.id)

            if(!contact)
            {
                res.status(404);
                throw new Error("Contact Not Found");
            }
            res.status(200).json(contact);
    });
//@desc Delete  contact 
//@route Delete api/contacts/:id
//@access public

const deleteContact = asyncHandler(async(req,res)=>
    {
        const contact = await Contact.findById(req.params.id)

        if(!contact)
        {
            res.status(404);
            throw new Error("Contact Not Found");
        }
        if(contact.user_id.toString() !== req.user.id)
            {
                res.status(403);
                throw new Error("Not allowed to change another user contact");
    
            }
        await Contact.deleteOne({ _id: req.params.id }); 
        res.status(200).json(contact);
    });
module.exports = {
     getContacts,
     createContact,
     updateContact,
     getContact,
     deleteContact
    };


