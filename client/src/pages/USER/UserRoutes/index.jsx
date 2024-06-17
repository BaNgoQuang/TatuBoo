import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import LayoutUser from "src/components/Layout/LayoutUser"
import { getCookie } from "src/lib/commonFunction"
import { Roles } from "src/lib/constant"
import ForbiddenPage from "src/pages/ErrorPage/ForbiddenPage"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"

const UserRoutes = () => {

  const isLogin = getCookie("token")
  const global = useSelector(globalSelector)

  return (
    <>
      {
        !!isLogin ?
          global?.user?.RoleID !== Roles.ROLE_ADMIN ?
            <LayoutUser>
              <Outlet />
            </LayoutUser>
            : <ForbiddenPage />
          : <Navigate to={Router.TRANG_CHU} />
      }
    </>
  )
}

export default UserRoutes