import http from "../index"
import { apiStatisticNewRegisteredUser, apiStatisticTotalUser } from "./urls"

const statisticNewRegisteredUser = params => http.get(`${apiStatisticNewRegisteredUser}?Key=${params}`)
const statisticTotalUser = body => http.post(apiStatisticTotalUser, body)

const Statistics = {
  statisticNewRegisteredUser,
  statisticTotalUser,
}

export default Statistics