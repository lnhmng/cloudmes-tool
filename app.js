import express from "express";
import http from "http";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import { CONSTANTS } from './src/utils/constants.js';
import routes from './src/routes/index.js';

import { swaggerUi, swaggerSpec } from "./src/services/swagger.js";

import sequelize from "./src/configs/postgreSQL-connect.js";

dotenv.config();

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json({ limit: CONSTANTS.MAX_JSON_BODY_REQUEST }));
app.use(cors({ origin: "*" }));
app.use('/', routes);

app.get('/', (req, res) => {
    res.json('Hello World');
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối database thành công.');

        const server = http.createServer(app);

        server.listen(process.env.APP_PORT, "0.0.0.0", () => {
            console.log(`Server is running on http://0.0.0.0:${process.env.APP_PORT}`);
        });
    } catch (error) {
        console.error('Đã xảy ra lỗi khi kết nối tới database:', error);
        process.exit(1);
    }
};

startServer();