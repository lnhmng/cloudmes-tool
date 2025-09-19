import { DataTypes } from "sequelize";
import sequelize from "../../configs/postgreSQL-connect.js";

const basic_role = sequelize.define("sys_role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role_code: DataTypes.STRING(64),
    role_name: DataTypes.STRING(64),
    factory_name: DataTypes.STRING(64),
}, {
    schema: "basic_sys",
    tableName: "sys_role",
    timestamps: false,
});

export default basic_role;
