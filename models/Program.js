// models/Program.js
const mongoose = require("mongoose");

const quotaSchema = new mongoose.Schema({
    name: String,   // KCET, COMEDK, Management
    totalSeats: Number,
    filledSeats: { type: Number, default: 0 }
});

const programSchema = new mongoose.Schema({
    institution: String,
    campus: String,
    department: String,
    programName: String,
    academicYear: String,
    courseType: { type: String, enum: ["UG", "PG"] },
    entryType: { type: String, enum: ["Regular", "Lateral"] },
    admissionMode: { type: String, enum: ["Government", "Management"] },
    intake: Number,
    quotas: [quotaSchema]
});

module.exports = mongoose.model("Program", programSchema);