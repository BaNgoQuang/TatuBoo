import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import LayoutAdmin from "src/components/Layout/LayoutAdmin"
import { getCookie } from "src/lib/commonFunction"
import { Roles } from "src/lib/constant"
import ForbiddenPage from "src/pages/ErrorPage/ForbiddenPage"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"

const AdminRoutes = () => {

  const isLogin = getCookie("token")
  const global = useSelector(globalSelector)

  return (
    <>
      {
        !!isLogin ?
          global?.user?.RoleID === Roles.ROLE_ADMIN ?
            <LayoutAdmin>
              <Outlet />
            </LayoutAdmin>
            : <ForbiddenPage />
          : <Navigate to={Router.TRANG_CHU} />
      }
    </>
  )
}

export default AdminRoutes