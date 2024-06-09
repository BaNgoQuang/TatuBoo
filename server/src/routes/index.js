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
import AdminRoute from "./admin.route.js"
import NotificationRoute from "./notification.route.js"
import LearnHistoryRoute from "./learnhistory.route.js"

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
  app.use("/admin", AdminRoute)
  app.use("/notification", NotificationRoute)
  app.use("/learnhistory", LearnHistoryRoute)
}

export default routes
