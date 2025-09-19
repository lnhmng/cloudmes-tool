import express from 'express';
import { CONSTANTS } from '../../../utils/constants.js';

import MesInterfaceLogController from '../../../controllers/mes/mes-interface-log.js';

const mes_interface_log = express.Router();

mes_interface_log.get(
    CONSTANTS.API_MES_INTERFACE_LOG,
    MesInterfaceLogController.get_mes_interface_log,
)

mes_interface_log.get(
    CONSTANTS.API_MES_INTERFACE_LOG_BY_ERROR_CODE,
    MesInterfaceLogController.get_logs_filter
)


export default mes_interface_log;