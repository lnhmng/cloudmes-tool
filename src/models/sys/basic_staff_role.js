import { DataTypes } from "sequelize";
import sequelize from "../../configs/postgreSQL-connect.js";
import basic_role from "./basic_role.js"; // import để liên kết

const basic_staff_role = sequelize.define("sys_staff_role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    staff_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
}, {
    schema: "basic_sys",
    tableName: "sys_staff_role",
    timestamps: false,
});

export default basic_staff_role;
