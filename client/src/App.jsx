import React from 'react'
import SpinCustom from './components/SpinCustom'
import Router from './routers'
import { ToastContainer } from 'react-toastify'
import { useRoutes } from 'react-router-dom'

// ADMIN
const AdminRoutes = React.lazy(() => import("src/pages/ADMIN/AdminRoutes"))
const UserManagement = React.lazy(() => import("src/pages/ADMIN/UserManagement"))

// ANONYMOUS
const AnonymousRoutes = React.lazy(() => import("src/pages/ANONYMOUS/AnonymousRoutes"))
const HomePage = React.lazy(() => import("src/pages/ANONYMOUS/HomePage"))
const LoginPage = React.lazy(() => import("src/pages/ANONYMOUS/LoginPage"))
const SignupPage = React.lazy(() => import("src/pages/ANONYMOUS/SignupPage"))
const BlogPage = React.lazy(() => import("src/pages/ANONYMOUS/BlogPage"))
const HowWordPage = React.lazy(() => import("src/pages/ANONYMOUS/HowWorkPage"))
const TeachWithUsPage = React.lazy(() => import("src/pages/ANONYMOUS/TeachWithUsPage"))

// USER
const UserRoutes = React.lazy(() => import("src/pages/USER/UserRoutes"))
const DashboardUser = React.lazy(() => import("src/pages/USER/DashboardUser"))
const InboxPage = React.lazy(() => import("src/pages/USER/InboxPage"))
const BillingPage = React.lazy(() => import("src/pages/USER/BillingPage"))
const JournalPage = React.lazy(() => import("src/pages/USER/JournalPage"))
const SchedulePage = React.lazy(() => import("src/pages/USER/SchedulePage"))
const AccountUser = React.lazy(() => import("src/pages/USER/AccountUser"))

const LazyLoadingComponent = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
          <SpinCustom />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

const routes = [
  // ADMIN
  {
    element: (
      <LazyLoadingComponent>
        <AdminRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: Router.QUAN_LY_NGUOI_DUNG,
        element: (
          <LazyLoadingComponent>
            <UserManagement />
          </LazyLoadingComponent>
        )
      },
    ]
  },
  // USER
  {
    element: (
      <LazyLoadingComponent>
        <UserRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: Router.DASHBOARD,
        element: (
          <LazyLoadingComponent>
            <DashboardUser />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.HOP_THU_DEN,
        element: (
          <LazyLoadingComponent>
            <InboxPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.THANH_TOAN,
        element: (
          <LazyLoadingComponent>
            <BillingPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.TAP_CHI,
        element: (
          <LazyLoadingComponent>
            <JournalPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.LICH_HOC,
        element: (
          <LazyLoadingComponent>
            <SchedulePage />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.CAI_DAT_TAI_KHOAN,
        element: (
          <LazyLoadingComponent>
            <AccountUser />
          </LazyLoadingComponent>
        )
      },
    ]
  },
  // ANONYMOUS
  {
    element: (
      <LazyLoadingComponent>
        <AnonymousRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: Router.TRANG_CHU,
        element: (
          <LazyLoadingComponent>
            <HomePage />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.DANG_KY,
        element: (
          <LazyLoadingComponent>
            <SignupPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.DANG_NHAP,
        element: (
          <LazyLoadingComponent>
            <LoginPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.BLOG,
        element: (
          <LazyLoadingComponent>
            <BlogPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.CACH_HOAT_DONG,
        element: (
          <LazyLoadingComponent>
            <HowWordPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.DAY_VOI_CHUNG_TOI,
        element: (
          <LazyLoadingComponent>
            <TeachWithUsPage />
          </LazyLoadingComponent>
        )
      },
    ]
  }
]

const App = () => {

  const appRoutes = useRoutes(routes)

  return (
    <div className="App">
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
      />
      <div>{appRoutes}</div>
    </div>
  )
}

export default App
