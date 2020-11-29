const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let record = new Schema(
    {
        _id: {type: ObjectID},
        First_Name: { type: String },
        Last_Name: { type: String },
        Role: { type: String },
        Email_Address: { type: String },
        Phone_Number: { type: String },
        Date_Of_Birth: { type: Date },
        Gender: { type: String },
        Status: { type: String },
        Salary: { type: Number },
        Specialization: { type: String },
        Last_Appointment: { type: Date },
        Primary_Doctor: { type: ObjectID },
        Diagnosis: { type: String },
        Treatment: { type: Array },
        Prescription: { type: Array }
    },
    {
        collection: "Records"
    }
);

module.exports = mongoose.model("record", record);
