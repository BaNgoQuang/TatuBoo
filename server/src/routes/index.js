import AccountRoute from "./account.route.js"
import CourseRoute from "./course.route.js"
import MessageRoute from "./message.route.js"
import OrganizationRoute from "./organization.route.js"
import ScheduleRoute from "./schedule.route.js"
import SubjectRoute from "./subject.route.js"
import SubjectCateRoute from "./subjectcate.route.js"
import SystemKeyRoute from "./systemkey.route.js"
import UserRoute from "./user.route.js"

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
}

export default routes
