const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const userRoute = require("./routes/user.route.js")
const archiveRoute = require("./routes/archive.route.js")
// const User = require("./models/user.model.js")
const app = express()

//middle ware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes
app.use("/api/users", userRoute)
app.use("/api/archive", archiveRoute)

app.listen(3000, () =>{
    console.log("http://localhost:3000/");
})

mongoose.connect("mongodb+srv://admin:l8bYf0WNJHhYdCp9@cluster0.5aqh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() =>{
    console.log('hoise')
})
.catch(() => {
    console.log("hoi nai")
})

// get
app.get('/', (req, res) => {
    console.log('dourai')
    res.send('dourai ar dourai')
})