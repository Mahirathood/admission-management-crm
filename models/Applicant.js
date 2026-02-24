// models/Applicant.js
const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    category: String,
    entryType: String,
    quotaType: String,
    marks: Number,
    documentsStatus: {
        type: String,
        enum: ["Pending", "Submitted", "Verified"],
        default: "Pending"
    }
});

module.exports = mongoose.model("Applicant", applicantSchema);