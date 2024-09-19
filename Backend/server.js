const express = require("express");
const mongoose=require("mongoose")
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser');
const cors = require("cors");
require('dotenv').config();
const pdf = require('html-pdf');
const app = express();
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const UserRoutes=require('./routes/UserRoutes.js')
const ReportRoutes=require('./routes/ReportRoutes.js')

app.use(bodyParser.json());
app.use(cors({credentials:true, origin:['http://localhost:3000']}))
app.use(fileUpload());
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected");
}).catch(()=>{
    console.log("Error");

})
app.use('/api/user',UserRoutes)
app.use('/api/report',ReportRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Server Running On ${process.env.PORT}`);
});
