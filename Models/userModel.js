const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username:
        {
            type : String,
            required : [true,"Please Enter your name"]
            
        },
        email:
        {
            type : String,
            required : [true,"Please add user email address"],
            unique :[true,"This email is already taken"]
            
        },
        password:
        {
            type : String,
            required : [true,"Please add a strong password"]
            
        },



},
{
    timestamps: true,
});

module.exports = mongoose.model("User",userSchema);