import express from 'express'
import { CONSTANTS } from '../../../utils/constants.js'

import authAPIs from './auth/index.js';
const router = express.Router()

router.use(CONSTANTS.API_AUTH, authAPIs);

router.use('/', authAPIs);

export default router

