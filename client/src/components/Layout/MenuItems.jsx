import Router from "src/routers"
import ListIcons from "../ListIcons"

export const MenuCommon = (subjectCates, subjects) => [
  {
    label: "Tìm kiếm bài học",
    children:
      !!subjectCates?.length
        ? subjectCates?.map(subCate => ({
          key: `${Router.LOAI_MON_HOC}/${subCate?._id}`,
          label: (
            <div className="blue-text">{subCate?.SubjectCateName}</div>
          ),
          children: !!subjects?.length
            ? subjects
              ?.filter(sub => sub?.SubjectCateID === subCate?._id)
              ?.map(i => ({
                key: `${Router.MON_HOC}/${i?._id}`,
                label: i?.SubjectName
              }))
            : []
        }))
        : []
  },
  {
    key: Router.BLOG,
    label: "Blog"
  },
  {
    key: Router.CACH_HOAT_DONG,
    label: "Cách hoạt động"
  },
  {
    key: Router.DAY_VOI_CHUNG_TOI,
    label: "Dạy với chúng tôi"
  },
]

export const MenuUser = () => [
  {
    key: Router.PROFILE,
    label: "Profile"
  },
  {
    key: Router.HOP_THU_DEN,
    label: "Hộp thư đến"
  },
  {
    key: Router.LICH_HOC,
    label: "Lịch học"
  },
  {
    key: Router.TAP_CHI,
    label: "Tạp chí"
  },
  {
    key: Router.THANH_TOAN,
    label: "Thanh toán"
  },
]

export const MenuAdmin = () => [
  {
    icon: ListIcons.ICON_STATISTIC,
    label: "Thống kê",
    key: '/dashboard',
    RoleID: [1, 2]
  },
  {
    icon: ListIcons.ICON_STAFF,
    label: "Quản trị hệ thống",
    key: '/dashboard/staff',
    RoleID: [1]
  },
  {
    icon: ListIcons.ICON_TEACHER,
    label: "Giáo viên",
    key: '/dashboard/teacher',
    RoleID: [1, 2]
  },
  {
    icon: ListIcons.ICON_STUDENT,
    label: "Học sinh",
    key: '/dashboard/student',
    RoleID: [1, 2]
  },
  {
    icon: ListIcons.ICON_SUBJECT_CATE,
    label: "Quản lý môn học",
    key: '/dashboard/subject-cate',
    RoleID: [1, 2],
  },
  {
    icon: ListIcons.ICON_REPORT,
    label: "Report",
    key: '/dashboard/report',
    RoleID: [1, 2]
  },
  {
    icon: ListIcons.ICON_PAYMENT,
    label: "Thanh toán",
    key: '/dashboard/payment',
    RoleID: [1]
  },
  {
    icon: <div style={{ marginLeft: '-5px' }}>{ListIcons.ICON_LOGOUT}</div>,
    label: "Đăng xuất",
    key: 'logout',
    RoleID: [1]
  },
]
