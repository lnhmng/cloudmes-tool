import { Op, Sequelize } from "sequelize";

import MesInterfaceLog from "../../models/mes/mes-interface-log.js";

class MesInterfaceLogRepository {

    /**
     * Function Repository: Lấy ra tất cả dữ liệu trong bảng mes_interface_log
     */

    static async get_mes_interface_log() {
        try {

            const mes_interface_log = await MesInterfaceLog.findAll({
                limit: 100,
            });

            return mes_interface_log || [];

        } catch (error) {
            throw error;
        }
    }

    /**
     * Function Repository:
     */

    static async get_logs_filter(content, dateTime) {
        try {
            const logs = await MesInterfaceLog.findAll({
                where: {
                    content: {
                        [Op.like]: `%${content}%`
                    },
                    call_time: {
                        [Op.gt]: Sequelize.literal(`TO_DATE('${dateTime}', 'YYYY-MM-DD HH24:MI:SS')`)
                    }
                },
                order: [['call_time', 'DESC']]
            });

            return logs;
        } catch (error) {
            throw error;
        }
    }

}

export default MesInterfaceLogRepository;