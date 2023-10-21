const express = require('express');
const router = express.Router();
const jobController = require('./jobController');

// Create a new job listing
router.post('/jobs', jobController.createJob);

// Get all job listings
router.get('/jobs', jobController.getAllJobs);

// Get a job listing by ID
router.get('/jobs/:id', jobController.getJobById);

// Update a job listing by ID
router.put('/jobs/:id', jobController.updateJob);

// Delete a job listing by ID
router.delete('/jobs/:id', jobController.deleteJob);

module.exports = router;
