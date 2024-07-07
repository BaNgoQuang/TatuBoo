import http from "../index"
import { apiStatisticBooking, apiStatisticNewRegisteredUser, apiStatisticTotalUser } from "./urls"

const statisticNewRegisteredUser = params => http.get(`${apiStatisticNewRegisteredUser}?Key=${params}`)
const statisticTotalUser = body => http.post(apiStatisticTotalUser, body)
const statisticBooking = () => http.get(apiStatisticBooking)

const Statistics = {
  statisticNewRegisteredUser,
  statisticTotalUser,
  statisticBooking,
}

export default Statistics