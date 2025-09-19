import { DataTypes } from "sequelize";
import sequelize from "../../configs/postgreSQL-connect.js";
import basic_staff_role from "./basic_staff_role.js"; // import để liên kết

const basic_staff = sequelize.define("sys_staff", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dep_id: DataTypes.INTEGER,
    dep_name: DataTypes.STRING(64),
    staff_code: DataTypes.STRING(64),
    staff_name: DataTypes.STRING(64),
    sex: DataTypes.INTEGER,
    email: DataTypes.STRING(64),
    job: DataTypes.STRING(64),
    entry_date: DataTypes.DATE,
    is_rel_user: DataTypes.BOOLEAN,
    job_status: DataTypes.INTEGER,
    is_platform: DataTypes.BOOLEAN,
    mobile: DataTypes.STRING(32),
    factory: DataTypes.STRING(32),
    extension_num: DataTypes.STRING(32),
    use_state: DataTypes.STRING(32),
    lock_reason: DataTypes.STRING(32),
    english_name: DataTypes.STRING(64),
    creator: DataTypes.STRING(64),
    creator_id: DataTypes.INTEGER,
    created_dt: DataTypes.BIGINT,
    last_editor: DataTypes.STRING(64),
    last_editor_id: DataTypes.INTEGER,
    last_edited_dt: DataTypes.BIGINT,
    is_deleted: DataTypes.BOOLEAN,
}, {
    schema: "basic_sys",
    tableName: "sys_staff",
    timestamps: false,
});

export default basic_staff;
