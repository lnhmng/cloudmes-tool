import express from 'express';

import { CONSTANTS } from '../../../utils/constants.js';

import SqlToolInterface from '../../../sites/controller/tool/sql-tool.js'


const sqlTool = express.Router();

// tool.get(
//     CONSTANTS.API_TABLE_INFO,
//     ToolController.get_table_info
// )

sqlTool.get(
    CONSTANTS.API_DATA,
    SqlToolInterface.toolRender

)

export default sqlTool;

