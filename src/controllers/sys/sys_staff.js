import SysStaffRepository from "../../repositories/sys/sys_staff.js";
import ReturnResponseUtil from "../../utils/return-response-util.js";

class SysStaffController {
    /**
     * Function Controller:
     * Lấy danh sách quyền MES của tài khoản theo staffCode
     */

    static async get_staff_info(req, res) {
        try {
            let { staffCode, factoryName } = req.query;

            if (!staffCode || (Array.isArray(staffCode) && staffCode.length === 0)) {
                return ReturnResponseUtil.returnResponse(res, 400, false, "staffCode is required");
            }
            if (!Array.isArray(staffCode)) staffCode = [staffCode];

            const result = await SysStaffRepository.getByStaffCodes(staffCode, factoryName);

            return ReturnResponseUtil.returnResponse(
                res,
                result && result.length > 0 ? 200 : 404,
                !!(result && result.length > 0),
                result && result.length > 0 ? "Successfully" : "Not found",
                result || []
            );
        } catch (error) {
            console.error(error);
            return ReturnResponseUtil.returnResponse(res, 500, false, "Server Error");
        }
    }

    /**
     * Function Controller:
     * THÊM MỚI TÀI KHOẢN CÔNG NHÂN XƯỞNG EPDVI_VN
     */

    static async createStaffAccountForEpdvi(req, res) {
        try {
            let data = req.body;

            if (!data || (Array.isArray(data) && data.length === 0)) {
                return ReturnResponseUtil.returnResponse(res, 400, false, "Data is required");
            }

            if (!Array.isArray(data)) {
                data = [data];
            }

            const result = await SysStaffRepository.createStaffAccountForEpdvi(data);

            if (result && result.length > 0) {
                return ReturnResponseUtil.returnResponse(res, 201, true, "Successfully created staff accounts", result);
            } else {
                return ReturnResponseUtil.returnResponse(res, 404, false, "Creation failed or no data was returned");
            }

        } catch (error) {
            console.error("Error creating staff account:", error);
            return ReturnResponseUtil.returnResponse(res, 500, false, "Server Error");
        }
    }
}

export default SysStaffController;
