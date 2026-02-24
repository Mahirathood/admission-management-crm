# Admission Management & CRM System

## Overview
This is a minimal web-based Admission Management System built using Node.js, Express, and MongoDB.

The system allows colleges to:
- Configure institutions and programs
- Define quota-based seat matrix
- Manage applicants
- Allocate seats without quota violations
- Generate unique admission numbers
- Track fee and document status
- View basic admission dashboards

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman (API Testing)

---

## Features Implemented

### 1. Master Setup
- Institution creation
- Campus setup
- Department setup
- Program configuration
- Academic year
- Course type (UG / PG)
- Entry type (Regular / Lateral)
- Admission mode (Government / Management)

### 2. Seat Matrix & Quota
- Program intake configuration
- Multiple quota setup (KCET, COMEDK, Management)
- Quota total must equal intake validation
- Real-time seat counter
- Prevent seat overbooking

### 3. Applicant Management
- Applicant creation
- Category tracking (GM/SC/ST)
- Entry type
- Quota type
- Marks storage
- Document status (Pending / Submitted / Verified)

### 4. Admission Allocation
- Government quota flow
- Management quota flow
- Seat availability check
- Seat locking
- Duplicate allocation prevention

### 5. Admission Confirmation
- Admission number generation
- Unique format:
  INST/2026/UG/CSE/KCET/0001
- Immutable admission number
- Confirmation allowed only if fee is paid

### 6. Fee Status
- Pending
- Paid
- Confirmation requires fee = Paid

### 7. Dashboard
Displays:
- Total intake vs admitted
- Quota-wise filled seats
- Remaining seats
- Applicants with pending documents
- Fee pending list

---

## System Rules Enforced

- Quota seats cannot exceed intake
- No allocation if quota is full
- Admission number generated only once
- Admission confirmed only if fee paid
- Seat counters update in real time

---

## API Endpoints

### Master
- POST /api/master/institution
- GET /api/master/institution
- POST /api/master/institution/:id/campus
- POST /api/master/institution/:id/department
- POST /api/master/program

### Applicant
- POST /api/applicants
- GET /api/applicants

### Admission
- POST /api/admissions/allocate
- PUT /api/admissions/pay/:id
- POST /api/admissions/confirm/:id
- GET /api/admissions

### Dashboard
- GET /api/dashboard

---

## Installation & Setup

1. Clone repository
