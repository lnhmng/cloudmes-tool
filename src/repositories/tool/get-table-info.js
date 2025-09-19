import sequelize from "../../configs/postgreSQL-connect.js";

class ToolRepository {

    /**
     * Function Repository: 
     */

    static async get_table_info() {
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
                t1.table_schema IN ('mes', 'basic_sys', 'wms') 
                AND t2.relkind = 'r'
            ORDER BY 
                "schemaName", "tableName", t1.ordinal_position;
        `;

            const [results] = await sequelize.query(sqlQuery);

            return results;

        } catch (error) {
            throw error;
        }
    }



}

export default ToolRepository;