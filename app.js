import express from "express";
import http from "http";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import { CONSTANTS } from './src/utils/constants.js';
import routes from './src/routes/index.js';

import sequelize from "./src/configs/postgresQL-connect.js";

import ExcelJS from 'exceljs';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: CONSTANTS.MAX_JSON_BODY_REQUEST }));
app.use(cors({ origin: "*" }));
app.use('/', routes);

app.get('/export-excel', async (req, res) => {
    try {
        const sqlQuery = `
            SELECT 
                t1.table_schema AS "schemaName",
                t1.table_name AS "tableName",
                t1.column_name AS "columnName",
                t1.data_type AS "dataType",
                t4.description AS "columnComment",   -- comment của cột
                t3.description AS "tableComment"     -- comment của bảng
            FROM 
                information_schema.columns AS t1
            JOIN 
                pg_class AS t2 ON t1.table_name = t2.relname
            LEFT JOIN 
                pg_description AS t3 ON t2.oid = t3.objoid AND t3.objsubid = 0
            LEFT JOIN 
                pg_description AS t4 ON t2.oid = t4.objoid AND t1.ordinal_position = t4.objsubid
            WHERE 
                t2.relkind = 'r'
            ORDER BY 
                "schemaName", "tableName", t1.ordinal_position;
        `;
        
        console.log('hi')

        const [results] = await sequelize.query(sqlQuery);

        const groupedData = results.reduce((acc, current) => {
            const { schemaName, tableName, columnName, dataType, columnComment, tableComment } = current;

            if (!acc[schemaName]) {
                acc[schemaName] = {};
            }
            if (!acc[schemaName][tableName]) {
                acc[schemaName][tableName] = {
                    comment: tableComment,
                    columns: []
                };
            }
            acc[schemaName][tableName].columns.push({ columnName, dataType, columnComment });

            return acc;
        }, {});

        const workbook = new ExcelJS.Workbook();

        for (const schemaName in groupedData) {
            const worksheet = workbook.addWorksheet(schemaName);

            worksheet.columns = [
                { header: 'Table name', key: 'tableName', width: 30 },
                { header: 'Column', key: 'columnName', width: 25 },
                { header: 'Data type', key: 'dataType', width: 20 },
                { header: 'Column Comment', key: 'columnComment', width: 50 },
                { header: 'Table Comment', key: 'tableComment', width: 50 }
            ];

            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF4472C4' } 
                };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });

            let startRow = 2;

            for (const tableName in groupedData[schemaName]) {
                const tableData = groupedData[schemaName][tableName];
                const numColumns = tableData.columns.length;

                tableData.columns.forEach((column, index) => {
                    const row = worksheet.getRow(startRow + index);
                    row.getCell('B').value = column.columnName;
                    row.getCell('C').value = column.dataType;
                    row.getCell('D').value = column.columnComment || '';
                    row.getCell('E').value = tableData.comment || '';

                    row.eachCell((cell) => {
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                    });
                });

                if (numColumns > 0) {
                    const endRow = startRow + numColumns - 1;

                    worksheet.mergeCells(`A${startRow}:A${endRow}`);
                    worksheet.getRow(startRow).getCell('A').value = tableName;

                    if (numColumns > 1) {
                        worksheet.mergeCells(`E${startRow}:E${endRow}`);
                    }
                }

                startRow += numColumns;
            }
        }

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=database_schema.xlsx`);

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error('Lỗi khi xuất file Excel:', error);
        res.status(500).json({ error: 'Không thể xuất file Excel' });
    }
});

app.get('/', (req, res) => {
    res.json('Hello World');
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối database thành công.');

        const server = http.createServer(app);

        server.listen(process.env.APP_PORT, () => {
            console.log(`Server is running on port ${process.env.APP_PORT}`);
        });
    } catch (error) {
        console.error('Đã xảy ra lỗi khi kết nối tới database:', error);
        process.exit(1); 
    }
};

startServer();