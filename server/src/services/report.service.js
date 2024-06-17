import { response } from "../utils/lib.js"
import { getOneDocument,  handleListQuery } from "../utils/queryFunction.js"
import Report from "../models/report.js"

const fncCreateReport = async (req) => {
    try {
        const newCreateReport = await Report.create(req.body)
        return response(newCreateReport, false, "Tạo bài viết thành công", 201)
      } catch (error) {
        return response({}, true, error.toString(), 500)
      }
}


const ReportService = {

}
    
export default ReportService