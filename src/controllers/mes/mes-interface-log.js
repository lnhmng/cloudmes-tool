import MesInterfaceLogRepository from "../../repositories/mes/mes_interface_log.js";
import ReturnResponseUtil from "../../utils/return-response-util.js";

class MesInterfaceLogController {

    /**
     * 
     */

    static async get_mes_interface_log(req, res) {

        try {

            const result = await MesInterfaceLogRepository.get_mes_interface_log();

            if (result.length != 0) {
                return ReturnResponseUtil.returnResponse(
                    res,
                    200,
                    true,
                    'Successfully',
                    result
                );
            } else {
                return ReturnResponseUtil.returnResponse(
                    res, 
                    404,
                    false,
                    'Not found',
                    result
                );
            }
            
        } catch (error) {
            console.log(error);
            return ReturnResponseUtil.returnResponse(
                res,
                500, 
                false,
                'Server Error',
                error
            );
        }

    }

    static async get_logs_filter(req, res) { 
        try {

            const content = req.query.content;
            const date_time = req.query.date_time;

            const result = await MesInterfaceLogRepository.get_logs_filter(content, date_time);

            if (result.length != 0) {
                return ReturnResponseUtil.returnResponse(
                    res,
                    200,
                    true,
                    'Successfully',
                    result
                );
            } else {
                return ReturnResponseUtil.returnResponse(
                    res, 
                    404,
                    false,
                    'Not found',
                    result
                );
            }
            
        } catch (error) {
            console.log(error);
            return ReturnResponseUtil.returnResponse(
                res,
                500, 
                false,
                'Server Error',
                error
            );
        }
    }

}

export default MesInterfaceLogController;