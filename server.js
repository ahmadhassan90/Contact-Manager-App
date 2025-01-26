const express = require('express');
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app =express();

connectDb();


const port =process.env.PORT || 5000;
app.use(express.json());// automatically parse the request body 
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () =>{

    console.log(`Server is running on port ${port}`);

}
)
