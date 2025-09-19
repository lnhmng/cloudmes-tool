import { DataTypes } from "sequelize";
import sequelize from "../../configs/postgreSQL-connect.js";

const mes_interface_log = sequelize.define('mes_interface_log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    function_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    source_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    call_time: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    call_result: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_dt: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: true
    },
    creator_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    last_edited_dt: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    last_editor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_editor_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    org_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    remark: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    schema: 'mes',
    tableName: 'mes_interface_log',
    timestamps: false,
});

export default mes_interface_log;