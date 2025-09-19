import express from 'express';
import { CONSTANTS } from '../../../utils/constants.js';

import SysStaffController from '../../../controllers/sys/sys_staff.js';

const sys_staff = express.Router();

sys_staff.get(
    CONSTANTS.API_STAFF,
    SysStaffController.get_staff_info,
)

sys_staff.post(
    CONSTANTS.API_STAFF,
    SysStaffController.createStaffAccountForEpdvi,
)

export default sys_staff;