const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.port || 4000;

app.listen(port, () => {
    console.log("Running");
});
//app.use(cors({ origin: "http://localhost:" + port }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
    console.log("Server is running on port: " + port);
})

const uri = "mongodb+srv://Admin_NathanLucero:Twister1997@cluster0.gioxl.mongodb.net/Solaris?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
})

var record = require("./model");
const { findById } = require("./model");

// Allows for the Creation of records
var create = function (req, res) {

    var data = req.body;

    record.insertMany(data)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });
}
//Reads All Records
var readAll = function (req, res) {

    record.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
}

//Reads One Specified Record by ID
var readOne = function (req, res) {

    record.find({ "_id": "5fbc757e4575bbd76db01abc"}) // Specified ID
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
}
//Reads Salaries higher than defined boundary
var readysalary = function (req, res) {

    record.find({ "Salary": {$gt: 300000}}) // Specified Salary
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
}

//Reads All Doctors
var doctors = function (req, res) {

    record.find({ "Role": "Doctor"  }) // Specified Role
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
}

//Reads All Patients
var patients = function (req, res) {

    record.find({ "Role": "Patient" }) // Specified Role
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
}

//Reads All Individuals who are Deceased
var deceased = function (req, res) {

    record.find({ "Status": "Deceased" }) // Specified Status
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
}

//Reads  Individuals who's Date of Birth is later set Date
var birthdayafter = function (req, res) {

    record.find({ "Date_Of_Birth": {$gt: new Date('1985-01-01')} }) // Specified Status
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
}


//Updates a Record
var recordFix = function (req, res) {
    record.updateMany
        (
            { "_id": "5fbc79664575bbd76db01abf" }, // Specified ID

            {
                "Salary": 325000,         // Change Salary
                "First_Name": "Nicole"    // Change First Name 
            }

        )


        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });

}

//Deletes a Record
var remove = function (req, res) {
    record.deleteOne({ "_id": ("5fbc757e4575bbd76db01abc") }) // Specified ID
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });

}






////API routes & CRUD///////


//URL Path where One or More Records will be created[following model.js format] (POST)
app.post("/records", create)



//URL Path to Read All Records (GET)
app.get("/records", readAll)

//URL Path to Read One Specific Record (GET)
app.get("/records/readone", readOne)

//URL Path to Read Records with Salaries greater than parameter set (GET)
app.get("/records/readsalaries", readysalary)

//URL Path to Read all Records of Doctors (GET)
app.get("/records/doctors", doctors)

//URL Path to Read all Records of Patients (GET)
app.get("/records/patients", patients)

//URL Path to Read all Records of individuals who have passed away (GET)
app.get("/records/deceased", deceased)

//URL Path to Read all Birthdays After Fixed Date (GET)
app.get("/records/birthdayafter", birthdayafter)



//Update (PATCH)
app.patch("/records/fixrecord", recordFix)



//Delete any Record if necessary (DELETE)
app.delete("/records/deleterecord", remove)