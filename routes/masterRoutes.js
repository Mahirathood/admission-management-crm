// routes/masterRoutes.js

const express = require("express");
const router = express.Router();

const Institution = require("../models/Institution");
const Program = require("../models/Program");
const roleMiddleware = require("../middleware/roleMiddleware");

// GET TEST ROUTE (So browser doesn't show Cannot GET)
router.get("/", (req, res) => {
    res.send("Master Routes Working");
});

// CREATE INSTITUTION (Admin Only)
router.post("/institution",
    roleMiddleware(["Admin"]),
    async (req, res) => {
        try {
            const { name, code } = req.body;

            if (!name || !code) {
                return res.status(400).json({
                    message: "Name and Code required"
                });
            }

            const institution = new Institution({ name, code });
            await institution.save();

            res.status(201).json({
                message: "Institution Created Successfully",
                institution
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// GET ALL INSTITUTIONS (For Browser Testing)

router.get("/institution", async (req, res) => {
    const institutions = await Institution.find();
    res.json(institutions);
});

// ADD CAMPUS

router.post("/institution/:id/campus",
    roleMiddleware(["Admin"]),
    async (req, res) => {

        const institution = await Institution.findById(req.params.id);
        if (!institution) {
            return res.status(404).json({
                message: "Institution Not Found"
            });
        }

        institution.campuses.push({ name: req.body.name });
        await institution.save();

        res.json({
            message: "Campus Added",
            institution
        });
    }
);


// ADD DEPARTMENT
router.post("/institution/:id/department",
    roleMiddleware(["Admin"]),
    async (req, res) => {

        const institution = await Institution.findById(req.params.id);
        if (!institution) {
            return res.status(404).json({
                message: "Institution Not Found"
            });
        }

        institution.departments.push({ name: req.body.name });
        await institution.save();

        res.json({
            message: "Department Added",
            institution
        });
    }
);

// CREATE PROGRAM WITH QUOTA VALIDATION
router.post("/program",
    roleMiddleware(["Admin"]),
    async (req, res) => {

        try {

            const {
                institution,
                campus,
                department,
                programName,
                academicYear,
                courseType,
                entryType,
                admissionMode,
                intake,
                quotas
            } = req.body;

            if (!quotas || !Array.isArray(quotas)) {
                return res.status(400).json({
                    message: "Quotas required"
                });
            }

            const totalQuotaSeats = quotas.reduce(
                (sum, q) => sum + q.totalSeats,
                0
            );

            if (totalQuotaSeats !== intake) {
                return res.status(400).json({
                    message: "Total quota seats must equal intake"
                });
            }

            const program = new Program({
                institution,
                campus,
                department,
                programName,
                academicYear,
                courseType,
                entryType,
                admissionMode,
                intake,
                quotas
            });

            await program.save();

            res.status(201).json({
                message: "Program Created Successfully",
                program
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// GET ALL PROGRAMS
router.get("/programs", async (req, res) => {
    const programs = await Program.find();
    res.json(programs);
});


module.exports = router;