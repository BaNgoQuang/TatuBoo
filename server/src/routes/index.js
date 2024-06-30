import AccountRoute from "./account.route.js"
import MessageRoute from "./message.route.js"
import TimeTableRoute from "./timetable.route.js"
import SubjectRoute from "./subject.route.js"
import SubjectCateRoute from "./subjectcate.route.js"
import SystemKeyRoute from "./systemkey.route.js"
import UserRoute from "./user.route.js"
import BlogRoute from "./blog.route.js"
import PaymentRoute from "./payment.route.js"
import BankingInforRoute from "./bankinginfor.route.js"
import NotificationRoute from "./notification.route.js"
import LearnHistoryRoute from "./learnhistory.route.js"
import CommentRoute from "./comment.route.js"
import ReportRoute from "./report.route.js"
import StatisticRoute from "./statistic.route.js"

const routes = (app) => {
  app.use("/account", AccountRoute)
  app.use("/message", MessageRoute)
  app.use("/timetable", TimeTableRoute)
  app.use("/subject", SubjectRoute)
  app.use("/subjectcate", SubjectCateRoute)
  app.use("/systemkey", SystemKeyRoute)
  app.use("/user", UserRoute)
  app.use("/blog", BlogRoute)
  app.use("/payment", PaymentRoute)
  app.use("/bankinginfor", BankingInforRoute)
  app.use("/notification", NotificationRoute)
  app.use("/learnhistory", LearnHistoryRoute)
  app.use("/comment", CommentRoute)
  app.use("/report", ReportRoute)
  app.use("/statistic", StatisticRoute)
}

export default routes
