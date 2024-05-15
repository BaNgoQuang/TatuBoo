import SubjectService from "../services/subject.service.js"

const createSubject = async (req, res) => {
  try {
    const response = await SubjectService.fncCreateSubject(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListSubject = async (req, res) => {
  try {
    const response = await SubjectService.fncGetListSubject(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const SubjectController = {
  createSubject,
  getListSubject,

}

export default SubjectController
