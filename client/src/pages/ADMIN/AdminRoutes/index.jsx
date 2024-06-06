import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import LayoutAdmin from "src/components/Layout/LayoutAdmin"
import { Roles } from "src/lib/constant"
import ForbiddenPage from "src/pages/ErrorPage/ForbiddenPage"
import { globalSelector } from "src/redux/selector"

const AdminRoutes = () => {

  const global = useSelector(globalSelector)

  return (
    <>
      {
        (!!global?.user?._id && global?.user?.RoleID === Roles.ROLE_ADMIN) ?
          <LayoutAdmin>
            <Outlet />
          </LayoutAdmin>
          :
          <ForbiddenPage />
      }
    </>
  )
}

export default AdminRoutes