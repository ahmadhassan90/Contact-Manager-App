const asyncHandler = require("express-async-handler")
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a User 
//@route POST api/users/register
//@access public
const registerUser = asyncHandler(async(req,res) =>
    {
        const { username,email,password } =req.body;
        if(!username || !email || !password)
        {
            res.status(400);
            throw new Error ("All fields are mandatory !");
        }
        const userAvailable = await User.findOne({email});
        if(userAvailable)
        {
            res.status(400);
            throw new Error ("User with this email is already Registered!");
        }
        const hashedPassword= await bcrypt.hash(password,10);
        console.log("The Hash Password is",hashedPassword);
        const user = await User.create({
            username,
            email,
            password:hashedPassword,
        })
        console.log(`User Created ${user}`);
        if(user)
        {
            res.status(201).json({_id:user.id,email: user.email});
            
        }
        else
        {
            res.status(400);
            throw new Error("User Data is not Valid");
        }
        
    });
//@desc Login a User 
//@route POST api/users/login
//@access public
const loginUser = asyncHandler(async(req,res) =>
    {
        const {email,password}=req.body;
        if(!email || !password)
        {
            res.status(400)
            throw new Error("All fields are mandatory!")
        }
        const user  =  await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password)))
        {
            const accessToken = jwt.sign({
                user:{
                    username:user.username,
                    email: user.email,
                    id:user.id

                }
            },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
            res.status(200).json({accessToken})

        }
        else
        {
            res.status(401);
            throw new Error("Email or Password is not correct.")

        }
    });

//@desc  Current User Info
//@route GET api/users/current
//@access private
const currentUser = asyncHandler(async(req,res) =>
    {
            res.json(req.user);
    });


    
module.exports = {registerUser,loginUser,currentUser};
