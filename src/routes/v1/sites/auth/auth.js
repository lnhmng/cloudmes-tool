import express from 'express';

import { CONSTANTS } from '../../../../utils/constants.js';

import AuthController from '../../../../sites/controller/mes/authController.js';

const auth = express.Router();

auth.get(
    CONSTANTS.API_LOGIN,
    AuthController.loginRender
)

export default auth;