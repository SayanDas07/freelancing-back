import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createJob, getJobs } from '../controllers/job.controller.js';

const router = Router()

router.route('/').get(verifyJWT, getJobs)

router.route('/create-job').post(verifyJWT, createJob)

export default router