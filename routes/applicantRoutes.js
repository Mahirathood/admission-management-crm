// routes/applicantRoutes.js
const express = require("express");
const router = express.Router();
const Applicant = require("../models/Applicant");

// Create Applicant
router.post("/create", async (req, res) => {
    try {
        const applicant = new Applicant(req.body);
        await applicant.save();
        res.json({ message: "Applicant Created", applicant });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update Document Status
router.put("/documents/:id", async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant) return res.status(404).json({ message: "Not Found" });

        applicant.documentsStatus = req.body.documentsStatus;
        await applicant.save();

        res.json({ message: "Document Status Updated", applicant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Applicants
router.get("/", async (req, res) => {
    const applicants = await Applicant.find();
    res.json(applicants);
});

module.exports = router;