import express from 'express';
import {CONSTANTS} from '../../utils/constants.js';

import mes_APIs from './mes/index.js';
import sys_APIs from './sys/index.js';
import tool_APIs from './tools/index.js';

const router = express.Router();

router.use(CONSTANTS.API_MES, mes_APIs);
router.use(CONSTANTS.API_SYS, sys_APIs);
router.use(CONSTANTS.API_TOOLS, tool_APIs);

export default router