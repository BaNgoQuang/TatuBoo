import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import LayoutUser from "src/components/Layout/LayoutUser"
import { Roles } from "src/lib/constant"
import ForbiddenPage from "src/pages/ErrorPage/ForbiddenPage"
import { globalSelector } from "src/redux/selector"

const UserRoutes = () => {

  const global = useSelector(globalSelector)

  return (
    <>
      {
        (!!global?.user?._id && global?.user?.RoleID !== Roles.ROLE_ADMIN) ?
          <LayoutUser>
            <Outlet />
          </LayoutUser>
          :
          <ForbiddenPage />
      }
    </>
  )
}

export default UserRoutes