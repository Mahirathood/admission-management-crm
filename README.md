# Admission Management & CRM System

## Overview
A minimal backend system for managing college admissions.

Built using:
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Features

### Master Setup
- Create Institution
- Add Campus
- Add Department
- Configure Program
- Define Intake and Quotas

### Seat Matrix & Quota
- Quota seats must equal intake
- Real-time seat counter
- Prevent seat overbooking
- Block allocation when quota is full

### Applicant Management
- Create applicant
- Store category, entry type, marks
- Track document status

### Admission Allocation
- Allocate seat by quota
- Prevent duplicate allocation
- Validate seat availability

### Admission Confirmation
- Generate unique admission number
- Format: `INST/2026/UG/CSE/KCET/0001`
- Confirm only if fee is paid
- Admission number generated once only

### Dashboard
- Total intake vs admitted
- Quota-wise filled seats
- Remaining seats
- Pending documents
- Fee pending list

---

## API Endpoints

### Master
- POST /api/master/institution
- POST /api/master/institution/:id/campus
- POST /api/master/institution/:id/department
- POST /api/master/program

### Applicants
- POST /api/applicants
- GET /api/applicants

### Admissions
- POST /api/admissions/allocate
- PUT /api/admissions/pay/:id
- POST /api/admissions/confirm/:id
- GET /api/admissions

### Dashboard
- GET /api/dashboard

---

## Setup

1. Install dependencies


## AI Assistance Disclosure

This project was developed independently as part of a technical assessment.

AI tools (ChatGPT) were used for:
- Debugging assistance
- Clarification of MongoDB validation logic
- Improving error handling structure

All business rules, seat validation logic, admission workflow design, and final implementation decisions were fully understood and verified manually by the author.

The candidate is able to explain:
- Quota validation logic
- Seat allocation mechanism
- Admission number generation logic
- Fee confirmation rule enforcement
- Dashboard aggregation logic
