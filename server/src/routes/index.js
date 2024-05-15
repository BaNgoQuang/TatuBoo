import AccountRoute from "./account.route.js"
import CourseRoute from "./course.route.js"
import MessageRoute from "./message.route.js"
import OrganizationRoute from "./organization.route.js"
import ScheduleRoute from "./schedule.route.js"
import SubjectRoute from "./subject.route.js"
import SubjectCateRoute from "./subjectcate.route.js"
import SystemKeyRoute from "./systemkey.route.js"
import UserRoute from "./user.route.js"
import BlogRoute from "./blog.route.js"
import PaymentHistoryRoute from "./paymenthistory.route.js"
import BankingInforRoute from "./bankinginfor.route.js"
import NotificationRoute from "./notification.route.js"

const routes = (app) => {
  app.use("/account", AccountRoute)
  app.use("/course", CourseRoute)
  app.use("/message", MessageRoute)
  app.use("/organization", OrganizationRoute)
  app.use("/schedule", ScheduleRoute)
  app.use("/subject", SubjectRoute)
  app.use("/subjectcate", SubjectCateRoute)
  app.use("/systemkey", SystemKeyRoute)
  app.use("/user", UserRoute)
  app.use("/blog", BlogRoute)
  app.use("paymenthistory", PaymentHistoryRoute)
  app.use("/bankinginfor", BankingInforRoute)
  app.use("/notification", NotificationRoute)
}

export default routes
