import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import SpinCustom from './components/SpinCustom'
import { decodeData, getLocalStorage } from './lib/commonFunction'
import FindTeacher from './pages/ANONYMOUS/FindTeacher'
import NotFoundPage from './pages/ErrorPage/NotFoundPage'
import globalSlice from './redux/globalSlice'
import Router from './routers'
import CommonService from './services/CommonService'
import SubjectCateService from './services/SubjectCateService'
import SubjectService from './services/SubjectService'
import UserService from './services/UserService'
import socket from './utils/socket'

// ADMIN
const AdminRoutes = React.lazy(() => import("src/pages/ADMIN/AdminRoutes"))
const StatisticManagement = React.lazy(() => import("src/pages/ADMIN/StatisticManagement"))
const StaffManagement = React.lazy(() => import("src/pages/ADMIN/StaffManagement"))
const StudentManagement = React.lazy(() => import("src/pages/ADMIN/StudentManagement"))
const TeacherManagement = React.lazy(() => import("src/pages/ADMIN/TeacherManagement"))
const ReportManagement = React.lazy(() => import("src/pages/ADMIN/ReportManagement"))
const PaymentManagement = React.lazy(() => import("src/pages/ADMIN/PaymentManagement"))
const SubjectCateManagement = React.lazy(() => import("src/pages/ADMIN/SubjectCateManagement"))

// ANONYMOUS
const AnonymousRoutes = React.lazy(() => import("src/pages/ANONYMOUS/AnonymousRoutes"))
const HomePage = React.lazy(() => import("src/pages/ANONYMOUS/HomePage"))
const LoginPage = React.lazy(() => import("src/pages/ANONYMOUS/LoginPage"))
const SignupPage = React.lazy(() => import("src/pages/ANONYMOUS/SignupPage"))
const BlogPage = React.lazy(() => import("src/pages/ANONYMOUS/BlogPage"))
const HowWordPage = React.lazy(() => import("src/pages/ANONYMOUS/HowWorkPage"))
const TeachWithUsPage = React.lazy(() => import("src/pages/ANONYMOUS/TeachWithUsPage"))
const TeacherDetail = React.lazy(() => import("src/pages/ANONYMOUS/TeacherDetail"))
const MentorForSubject = React.lazy(() => import("src/pages/ANONYMOUS/MentorForSubject"))
const BookingPage = React.lazy(() => import("src/pages/ANONYMOUS/BookingPage"))
const FindSubject = React.lazy(() => import("src/pages/ANONYMOUS/FindSubject"))

// USER
const UserRoutes = React.lazy(() => import("src/pages/USER/UserRoutes"))
const UserProfile = React.lazy(() => import("src/pages/USER/UserProfile"))
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
        path: Router.QUAN_LY_THONG_KE,
        element: (
          <LazyLoadingComponent>
            <StatisticManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.QUAN_LY_STAFF,
        element: (
          <LazyLoadingComponent>
            <StaffManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.QUAN_LY_GIAO_VIEN,
        element: (
          <LazyLoadingComponent>
            <TeacherManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.QUAN_LY_HOC_SINH,
        element: (
          <LazyLoadingComponent>
            <StudentManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.QUAN_LY_REPORT,
        element: (
          <LazyLoadingComponent>
            <ReportManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.QUAN_LY_GIAO_DICH,
        element: (
          <LazyLoadingComponent>
            <PaymentManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.QUAN_LY_MON_HOC,
        element: (
          <LazyLoadingComponent>
            <SubjectCateManagement />
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
        path: Router.PROFILE,
        element: (
          <LazyLoadingComponent>
            <UserProfile />
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
        path: Router.LICH_SU_GIAO_DICH,
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
      }
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
      {
        path: Router.TIM_KIEM_GIAO_VIEN,
        element: (
          <LazyLoadingComponent>
            <FindTeacher />
          </LazyLoadingComponent>
        )
      },
      {
        path: `${Router.GIAO_VIEN}/:TeacherID${Router.MON_HOC}/:SubjectID`,
        element: (
          <LazyLoadingComponent>
            <TeacherDetail />
          </LazyLoadingComponent>
        )
      },
      {
        path: `${Router.GIAO_VIEN}/:TeacherID${Router.MON_HOC}/:SubjectID/booking`,
        element: (
          <LazyLoadingComponent>
            <BookingPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: `${Router.MON_HOC}/:SubjectID`,
        element: (
          <LazyLoadingComponent>
            <MentorForSubject />
          </LazyLoadingComponent>
        )
      },
      {
        path: Router.TIM_KIEM_MON_HOC,
        element: (
          <LazyLoadingComponent>
            <FindSubject />
          </LazyLoadingComponent>
        )
      },
    ]
  },
  {
    path: "*",
    element: (
      <LazyLoadingComponent>
        <NotFoundPage />
      </LazyLoadingComponent>
    )
  }
]

const App = () => {

  const appRoutes = useRoutes(routes)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const bodyGetList = {
    TextSearch: "",
    CurrentPage: 0,
    PageSize: 0
  }
  const [loading, setLoading] = useState(false)

  const getListSystemkey = async () => {
    const res = await CommonService.getListSystemkey()
    if (res?.isError) return
    dispatch(globalSlice.actions.setListSystemKey(res?.data))
  }

  const getListSubjectCate = async () => {
    const res = await SubjectCateService.getListSubjectCate(bodyGetList)
    if (res?.isError) return
    dispatch(globalSlice.actions.setSubjectCates(res?.data?.List))
  }

  const getListSubject = async () => {
    const res = await SubjectService.getListSubject(bodyGetList)
    if (res?.isError) return
    dispatch(globalSlice.actions.setSubjects(res?.data?.List))
  }

  const getDetailProfile = async (token) => {
    try {
      setLoading(true)
      const res = await UserService.getDetailProfile(token)
      if (res?.isError) {
        localStorage.removeItem('token')
        return
      }
      socket.connect()
      dispatch(globalSlice.actions.setUser(res?.data))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListSystemkey()
    getListSubjectCate()
    getListSubject()
    if (!!getLocalStorage("token")) {
      const user = decodeData(getLocalStorage("token"))
      if (!!user.ID) {
        getDetailProfile(getLocalStorage("token"))
      } else {
        navigate('/forbidden')
      }
    }
  }, [])



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
