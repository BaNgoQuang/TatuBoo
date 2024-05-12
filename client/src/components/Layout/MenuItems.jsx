import Router from "src/routers"

export const MenuCommon = [
  {
    key: "1",
    label: "Tìm kiếm bài học",
    children: [
      {
        key: "abc",
        label: "Nhạc cụ",
        children: [
          {
            key: "2",
            label: "Sáo"
          },
          {
            key: "3",
            label: "Sáo"
          },
          {
            key: "4",
            label: "Sáo"
          },
          {
            key: "5",
            label: "Sáo"
          },
        ]
      },
      {
        key: "xyz",
        label: "Nhạc cụ",
        children: [
          {
            key: "6",
            label: "Sáo"
          },
          {
            key: "7",
            label: "Sáo"
          },
          {
            key: "8",
            label: "Sáo"
          },
          {
            key: "9",
            label: "Sáo"
          },
        ]
      }
    ]
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

export const MenuUser = [
  {
    key: Router.DASHBOARD,
    label: "Blog"
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

export const MenuAdmin = []
