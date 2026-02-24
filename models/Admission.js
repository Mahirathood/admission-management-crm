// models/Admission.js
const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant" },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
    quota: String,
    admissionNumber: { type: String, unique: true },
    feeStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    },
    confirmed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Admission", admissionSchema);