// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();

const Program = require("../models/Program");
const Admission = require("../models/Admission");
const Applicant = require("../models/Applicant");

// DASHBOARD ANALYTICS
router.get("/", async (req, res) => {
    try {

        const programs = await Program.find();
        const admissions = await Admission.find().populate("applicant program");
        const applicants = await Applicant.find();

        // Program-wise stats
        const programStats = programs.map(program => {

            const totalFilled = program.quotas.reduce(
                (sum, q) => sum + q.filledSeats,
                0
            );

            return {
                programName: program.programName,
                intake: program.intake,
                admitted: totalFilled,
                remaining: program.intake - totalFilled,
                quotas: program.quotas.map(q => ({
                    name: q.name,
                    totalSeats: q.totalSeats,
                    filledSeats: q.filledSeats,
                    remainingSeats: q.totalSeats - q.filledSeats
                }))
            };
        });

        // Fee pending list
        const feePendingList = admissions
            .filter(a => a.feeStatus === "Pending")
            .map(a => ({
                applicantName: a.applicant?.name,
                program: a.program?.programName,
                quota: a.quota
            }));

        // Pending document list
        const pendingDocumentsList = applicants
            .filter(a => a.documentsStatus !== "Verified")
            .map(a => ({
                name: a.name,
                documentsStatus: a.documentsStatus
            }));

        res.json({
            summary: {
                totalPrograms: programs.length,
                totalAdmissions: admissions.length,
                feePendingCount: feePendingList.length,
                pendingDocumentsCount: pendingDocumentsList.length
            },
            programStats,
            feePendingList,
            pendingDocumentsList
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;