import { useLayoutEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import LayoutAdmin from "src/components/Layout/LayoutAdmin"
import { MenuAdmin } from "src/components/Layout/MenuItems"
import { getCookie } from "src/lib/commonFunction"
import ForbiddenPage from "src/pages/ErrorPage/ForbiddenPage"
import Router from "src/routers"

const AdminRoutes = () => {

  const isLogin = getCookie("token")
  const [menuAdmin, setMenuAdmin] = useState([])

  useLayoutEffect(() => {
    setMenuAdmin(MenuAdmin())
  }, [])

  return (
    <>
      {
        !!isLogin ?
          !!menuAdmin?.length ?
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