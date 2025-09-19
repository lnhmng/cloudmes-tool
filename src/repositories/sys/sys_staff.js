import { Op } from "sequelize";

import basic_staff from "../../models/sys/basic_staff.js";
import basic_role from "../../models/sys/basic_role.js";
import basic_staff_role from "../../models/sys/basic_staff_role.js";

// Associations
basic_staff.hasMany(basic_staff_role, { foreignKey: "staff_id" });
basic_staff_role.belongsTo(basic_staff, { foreignKey: "staff_id" });

basic_role.hasMany(basic_staff_role, { foreignKey: "role_id" });
basic_staff_role.belongsTo(basic_role, { foreignKey: "role_id" });

class SYS_STAFF_REPOSITORIES {

    /**
     * Function Repository: LẤY RA DANH SÁCH QUYỀN HẠN MES CỦA TÀI KHOẢN
     */

    static async getByStaffCodes(staffCodes, factoryName = null) {
        try {
            const result = await basic_staff.findAll({
                attributes: ["dep_name", "staff_code", "staff_name"],
                where: {
                    staff_code: { [Op.in]: staffCodes },
                },
                include: [
                    {
                        model: basic_staff_role,
                        attributes: ["role_id", "staff_id"],
                        required: true,
                        include: [
                            {
                                model: basic_role,
                                attributes: ["role_code", "role_name", "factory_name"],
                                required: true,
                                where: factoryName ? { factory_name: factoryName } : {},
                            },
                        ],
                    },
                ]
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function Repository: THÊM MỚI 1 STAFF
     */
    static async createStaffAccountForEpdvi(data) {
        try {

            const now = Date.now();

            const result = await basic_staff.create({
                dep_id: 5965,
                dep_name: "EPDVI_VN",
                staff_code: data.staff_code,
                staff_name: staff_code    ,
                sex: data.sex,
                email: data.email,
                job: data.job,
                entry_date: data.entry_date,
                is_rel_user: data.is_rel_user,
                job_status: data.job_status,
                is_platform: data.is_platform,
                mobile: data.mobile,
                factory: data.factory,
                extension_num: data.extension_num,
                use_state: data.use_state,
                lock_reason: data.lock_reason,
                english_name: data.english_name,
                creator: data.creator,
                creator_id: data.creator_id,
                created_dt: now,
                last_editor: data.last_editor,
                last_editor_id: data.last_editor_id,
                last_edited_dt: now,
                is_deleted: false,
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default SYS_STAFF_REPOSITORIES;
