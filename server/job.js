const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new job listing
const createJob = async (req, res) => {
  try {
    const job = await prisma.jobListing.create({
      data: req.body,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Could not create job listing' });
  }
};

// Get all job listings
const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.jobListing.findMany();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve job listings' });
  }
};

// Get a job listing by ID
const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.jobListing.findUnique({
      where: { id },
    });
    if (!job) {
      res.status(404).json({ error: 'Job listing not found' });
    } else {
      res.status(200).json(job);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve job listing' });
  }
};

// Update a job listing by ID
const updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.jobListing.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Could not update job listing' });
  }
};

// Delete a job listing by ID
const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.jobListing.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete job listing' });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
