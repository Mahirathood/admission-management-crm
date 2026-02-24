// models/Institution.js
const mongoose = require("mongoose");

const campusSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const institutionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true },  // Used in admission number
    campuses: [campusSchema],
    departments: [departmentSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Institution", institutionSchema);