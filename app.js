import express from "express";
import http from "http";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path from 'path';

import { CONSTANTS } from './src/utils/constants.js';
import routes from './src/routes/index.js';

import sequelize from "./src/configs/postgreSQL-connect.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/sites/views'))
app.use(cookieParser());

app.use(bodyParser.json({ limit: CONSTANTS.MAX_JSON_BODY_REQUEST }));
app.use(cors({ origin: "*" }));

app.use('/', routes);
app.use(express.static(path.join(__dirname, '/src/sites/publics')));

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối database thành công.');

        const server = http.createServer(app);

        server.listen(process.env.APP_PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
        });
    } catch (error) {
        console.error('Đã xảy ra lỗi khi kết nối tới database:', error);
        process.exit(1);
    }
};

startServer();