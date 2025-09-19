import express from 'express';
import sys_staff from './sys_staff.js';

const router = express.Router();

router.use("/", sys_staff)

export default router;