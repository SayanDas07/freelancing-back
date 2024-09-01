import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createJob = asyncHandler(async (req, res) => {

    if (req.user.role !== 'employer') {
        return res.status(403).json({ error: 'Only employers can create jobs' });
    }
    const { title, description, skills, salary } = req.body

    if (!title || !description || !salary) {
        return res.status(400).json({ error: 'Title, description, and salary are required', success: false });
    }

    const newJob = new Job({
        title,
        description,
        employer: req.user._id,
        skills,
        salary
    })

    await newJob.save()
    res.status(201).json(new ApiResponse(205, newJob, 'Job created successfully'))
})

const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find()
        .populate('employer', 'username companyName');

    if (jobs.length === 0) {
        return res.status(404).json({ error: 'Jobs not found', success: false });
    }

    res.json(new ApiResponse(200, jobs, 'Jobs retrieved successfully'))
})

export { createJob, getJobs }