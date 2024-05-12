import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import MainLayout from "src/components/Layout/MainLayout"
import ForbiddenPage from "src/pages/ErrorPage/ForbiddenPage"
import { globalSelector } from "src/redux/selector"

const UserRoutes = () => {

  const global = useSelector(globalSelector)

  return (
    <>
      {
        (!!global?.user?._id && global?.user?.RoleID !== 1) ?
          <MainLayout>
            <Outlet />
          </MainLayout>
          :
          <ForbiddenPage />
      }
    </>
  )
}

export default UserRoutes