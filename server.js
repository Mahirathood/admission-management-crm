// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const masterRoutes = require("./routes/masterRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
    res.send("Admission CRM Backend Running Successfully");
});

// API Routes 
app.use("/api/master", masterRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/dashboard", dashboardRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.error("MongoDB Connection Failed:", err.message);
        process.exit(1);
    });


//  Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});