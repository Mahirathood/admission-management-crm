
// routes/admissionRoutes.js
const express = require("express");
const router = express.Router();

const Program = require("../models/Program");
const Admission = require("../models/Admission");
const Applicant = require("../models/Applicant");

// ALLOCATE SEAT (Standalone MongoDB Compatible
router.post("/allocate", async (req, res) => {
    try {
        const { applicantId, programId, quotaName, allotmentNumber } = req.body;

        //1. Validate applicant exists
        const applicant = await Applicant.findById(applicantId);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        //2. Prevent duplicate admission
        const existingAdmission = await Admission.findOne({
            applicant: applicantId
        });

        if (existingAdmission) {
            return res.status(400).json({
                message: "Applicant already allocated"
            });
        }

        //3. Validate program
        const program = await Program.findById(programId);
        if (!program) {
            return res.status(404).json({ message: "Program not found" });
        }

        //4. Validate quota
        const quota = program.quotas.find(q => q.name === quotaName);
        if (!quota) {
            return res.status(400).json({ message: "Quota not found" });
        }

        //5. Check quota availability
        if (quota.filledSeats >= quota.totalSeats) {
            return res.status(400).json({ message: "Quota Full" });
        }

        //6. Increment seat count
        quota.filledSeats += 1;
        await program.save();

        //7. Create admission record
        const admission = new Admission({
            applicant: applicantId,
            program: programId,
            quota: quotaName,
            allotmentNumber: allotmentNumber || null,
            feeStatus: "Pending",
            confirmed: false
        });

        await admission.save();

        res.status(201).json({
            message: "Seat Allocated Successfully",
            admission
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//2.MARK FEE AS PAID
router.put("/pay/:id", async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);
        if (!admission) {
            return res.status(404).json({ message: "Admission Not Found" });
        }

        admission.feeStatus = "Paid";
        await admission.save();

        res.json({
            message: "Fee Marked as Paid",
            admission
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//CONFIRM ADMISSION

router.post("/confirm/:id", async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id)
            .populate("program");

        if (!admission) {
            return res.status(404).json({ message: "Admission Not Found" });
        }

        // Must pay fee first
        if (admission.feeStatus !== "Paid") {
            return res.status(400).json({ message: "Fee not paid" });
        }

        // Prevent regeneration
        if (admission.admissionNumber) {
            return res.json({
                message: "Already Confirmed",
                admission
            });
        }

        // Generate sequential number per program + quota
        const count = await Admission.countDocuments({
            program: admission.program._id,
            quota: admission.quota
        });

        const padded = String(count).padStart(4, "0");

        const admissionNumber =
            `${admission.program.institution}/` +
            `${admission.program.academicYear}/` +
            `${admission.program.courseType}/` +
            `${admission.program.programName}/` +
            `${admission.quota}/${padded}`;

        admission.admissionNumber = admissionNumber;
        admission.confirmed = true;

        await admission.save();

        res.json({
            message: "Admission Confirmed",
            admission
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ALL ADMISSIONS (Optional Utility Route)
router.get("/", async (req, res) => {
    try {
        const admissions = await Admission.find()
            .populate("applicant program");

        res.json(admissions);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;