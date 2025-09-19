import express from 'express';
import mes_interface_log from './mes-interface-log.js';

const router = express.Router();

router.use("/", mes_interface_log)

export default router;