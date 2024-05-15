import SubjectCateService from "../services/subjectcate.service.js"

const createSubjectCate = async (req, res) => {
  try {
    const response = await SubjectCateService.fncCreateSubjectCate(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListSubjectCate = async (req, res) => {
  try {
    const response = await SubjectCateService.fncGetListSubjectCate(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const SubjectCateController = {
  createSubjectCate,
  getListSubjectCate,

}

export default SubjectCateController
