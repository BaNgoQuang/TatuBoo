import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import TeacherProfile from "./TeacherProfile"
import StudentProfile from "./StudentProfile"

const UserProfile = () => {

  const { user } = useSelector(globalSelector)

  return (
    <div>
      {
        user?.RoleID === 3
          ? <TeacherProfile />
          : <StudentProfile />
      }
    </div>
  )
}

export default UserProfile