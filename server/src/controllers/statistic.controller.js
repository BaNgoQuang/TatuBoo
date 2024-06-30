import StatisticService from "../services/statistic.service.js"

const statisticTotalUser = async (req, res) => {
  try {
    const response = await StatisticService.fncStatisticTotalUser(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const statisticNewRegisteredUser = async (req, res) => {
  try {
    const response = await StatisticService.fncStatisticNewRegisteredUser(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const StatisticController = {
  statisticTotalUser,
  statisticNewRegisteredUser
}

export default StatisticController
