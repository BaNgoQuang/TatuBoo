import { Checkbox, Col, DatePicker, Empty, Radio, Row } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import SpinCustom from "src/components/SpinCustom"
import UserService from "src/services/UserService"
import { MainProfileWrapper } from "../TeacherDetail/styled"
import moment from "moment"
import { TimeItemStyled } from "./styled"
import dayjs from "dayjs"
import { MONGODB_DATE_FORMATER, SYSTEM_KEY } from "src/lib/constant"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { getListComboKey, getRealFee, randomNumber } from "src/lib/commonFunction"
import InputCustom from "src/components/InputCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { formatMoney } from "src/lib/stringUtils"
import PaymentService from "src/services/PaymentService"
import ModalCheckout from "./components/ModalSuccessBooking"
import Router from "src/routers"
import TimeTableService from "src/services/TimeTableService"
import LearnHistoryService from "src/services/LearnHistoryService"

const RootURLWebsite = import.meta.env.VITE_ROOT_URL_WEBSITE

const BookingPage = () => {

  const { TeacherID, SubjectID } = useParams()
  const { listSystemKey, user } = useSelector(globalSelector)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [teacher, setTeacher] = useState()
  const [subject, setSubject] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [selectedTimes, setSelectedTimes] = useState([])
  const [bookingInfor, setBookingInfor] = useState()
  const [times, setTimes] = useState([])
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [openModalCheckout, setOpenModalCheckout] = useState(false)

  const getDetailTeacher = async () => {
    try {
      setLoading(true)
      const res = await UserService.getDetailTeacher({ TeacherID, SubjectID })
      if (res?.isError) return navigate("/not-found")
      setTeacher(res?.data)
      setSubject(
        res?.data?.Subjects?.find(i => i?._id === SubjectID)
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSelectedTimes = (date) => {
    const dayGap = moment(moment(selectedDate).startOf("day")).diff(moment(moment(date?.StartTime).startOf("day")), "days")
    const checkExistTime = selectedTimes?.find(i =>
      dayjs(i?.StartTime).format("DD/MM/YYYY") ===
      dayjs(moment(date?.StartTime).add(dayGap, "days")).format("DD/MM/YYYY")
    )
    if (!!checkExistTime) {
      const copySelectedTimes = [...selectedTimes]
      const indexExsitTime = selectedTimes?.findIndex(i =>
        dayjs(i?.StartTime).format("DD/MM/YYYY HH:ss") ===
        dayjs(moment(date?.StartTime).add(dayGap, "days")).format("DD/MM/YYYY HH:ss")
      )
      if (indexExsitTime >= 0) {
        copySelectedTimes.splice(indexExsitTime, 1)
      } else if (indexExsitTime < 0) {
        const index = selectedTimes?.findIndex(i =>
          dayjs(i?.StartTime).format("DD/MM/YYYY") ===
          dayjs(moment(date?.StartTime).add(dayGap, "days")).format("DD/MM/YYYY")
        )
        copySelectedTimes.splice(index, 1, {
          StartTime: dayjs(moment(date?.StartTime).add(dayGap, "days")).format(MONGODB_DATE_FORMATER),
          EndTime: dayjs(moment(date?.EndTime).add(dayGap, "days")).format(MONGODB_DATE_FORMATER),
          dayGap: dayGap
        })
      }
      setSelectedTimes(copySelectedTimes)
    } else {
      setSelectedTimes(pre => [
        ...pre,
        {
          StartTime: dayjs(moment(date?.StartTime).add(dayGap, "days")).format(MONGODB_DATE_FORMATER),
          EndTime: dayjs(moment(date?.EndTime).add(dayGap, "days")).format(MONGODB_DATE_FORMATER),
          dayGap: dayGap
        }
      ])
    }
  }

  const createPaymentLink = async () => {
    try {
      setLoading(true)
      const res = await PaymentService.createPaymentLink({
        TotalFee: getRealFee(+teacher?.Price * selectedTimes.length * 1000),
        Description: "Thanh toán book giáo viên",
        ReturnURL: `${RootURLWebsite}${location.pathname}`,
        CancelURL: `${RootURLWebsite}${location.pathname}`
      })
      if (res?.isError) return
      window.location.href = res?.data
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteBooking = async () => {
    try {
      setLoading(true)
      const bodyTimeTable = selectedTimes?.map(i => ({
        Teacher: teacher?._id,
        Subject: SubjectID,
        DateAt: moment(i?.StartTime).format(MONGODB_DATE_FORMATER),
        StartTime: moment(i?.StartTime).format(MONGODB_DATE_FORMATER),
        EndTime: moment(i?.EndTime).format(MONGODB_DATE_FORMATER),
        LearnType: bookingInfor?.LearnType,
        Address: !!bookingInfor?.Address ? bookingInfor?.Address : undefined,
      }))
      const bodyPaymemt = {
        FeeType: 1,
        Description: `Thanh toán book giáo viên ${teacher?.FullName}`,
        TotalFee: getRealFee(+teacher?.Price * selectedTimes.length * 1000),
        TraddingCode: randomNumber()
      }
      const resTimeTable = TimeTableService.createTimeTable(bodyTimeTable)
      const resPayment = PaymentService.createPayment(bodyPaymemt)
      const result = await Promise.all([resTimeTable, resPayment])
      if (!!result[0]?.isError && !!result[1]?.isError) return
      const bodyLearnHistory = {
        Teacher: TeacherID,
        Subject: SubjectID,
        LearnNumber: selectedTimes.length,
        TotalFee: getRealFee(+teacher?.Price * selectedTimes.length * 1000),
      }
      const resLearnHistory = await LearnHistoryService.createLearnHistory(bodyLearnHistory)
      if (resLearnHistory?.isError) return
      setOpenModalCheckout({ FullName: teacher?.FullName })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setBookingInfor(pre => ({
      ...pre,
      Address: !!user?.Address ? user?.Address : ""
    }))
  }, [])

  useEffect(() => {
    getDetailTeacher()
  }, [TeacherID, SubjectID])

  useEffect(() => {
    if (
      !!queryParams.get("code") && queryParams.get("code") === "00" &&
      !!queryParams.get("status") && queryParams.get("status") === "PAID"
    ) {
      handleCompleteBooking()
    }
  }, [queryParams])

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[20]} className="pt-20">
        <Col span={17}>
          <MainProfileWrapper className="p-24">
            <div className="fs-20 fw-600 mb-12">Lựa chọn thời gian học</div>
            <Row gutter={[16]}>
              <Col span={12}>
                <div className="fs-16 fw-600 mb-8">Chọn ngày học</div>
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  disabledDate={current =>
                    current && current < dayjs().startOf("day")
                  }
                  onChange={e => {
                    setSelectedDate(dayjs(e).format())
                    setTimes(
                      teacher?.Schedules?.filter(i =>
                        i?.DateAt === dayjs(e).format("dddd")
                      )
                    )
                  }}
                />
              </Col>
              <Col span={12}>
                <div className="fs-16 fw-600 mb-8">Chọn thời gian học</div>
                <Row gutter={[16, 8]}>
                  {
                    !!times.length ?
                      times?.map((i, idx) =>
                        <Col span={12} key={idx}>
                          <TimeItemStyled
                            className={
                              !!selectedTimes?.some(item =>
                                dayjs(item?.StartTime).format("DD/MM/YYYY HH:ss") ===
                                dayjs(moment(i?.StartTime).add(item?.dayGap, "days")).format("DD/MM/YYYY HH:ss"))
                                ? "active"
                                : ""
                            }
                            onClick={() => handleSelectedTimes(i)}
                          >
                            {dayjs(i?.StartTime).format("HH:mm")} - {dayjs(i?.EndTime).format("HH:mm")}
                          </TimeItemStyled>
                        </Col>
                      )
                      : <Empty description="Không có thời gian học học" />
                  }
                </Row>
              </Col>
            </Row>
          </MainProfileWrapper>
        </Col>
        <Col span={7}>
          <MainProfileWrapper className="p-24">
            <div className="fs-20 fw-600 mb-16">Thông tin đặt lịch</div>
            <div className="teacher-infor d-flex mb-12">
              <img
                src={teacher?.AvatarPath} alt=""
                style={{
                  width: '60px',
                  height: "60px",
                  borderRadius: '50%',
                  marginRight: "12px"
                }}
              />
              <div>{teacher?.FullName}</div>
            </div>
            <div className="subject-infor mb-12">
              <span className="fw-600 fw-16 mr-8">Môn học:</span>
              <spn>{subject?.SubjectName}</spn>
            </div>
            <div className="learn-type">
              <div className="fw-600 fw-16 mb-8">Hình thức học:</div>
              <Radio.Group
                className="mb-8"
                onChange={e => setBookingInfor(pre => ({ ...pre, LearnType: e.target.value }))}
              >
                {
                  teacher?.LearnTypes?.map(i =>
                    <Radio key={i} value={i}>
                      {
                        getListComboKey(SYSTEM_KEY.LEARN_TYPE, listSystemKey)?.find(item =>
                          item?.ParentID === i)?.ParentName
                      }
                    </Radio>
                  )
                }
              </Radio.Group>
            </div>
            {
              bookingInfor?.LearnType === 2 &&
              <div className="address mb-12">
                <InputCustom
                  placeholder="Nhập vào địa chỉ"
                  value={bookingInfor?.Address}
                  onChange={e => setBookingInfor(pre => ({ ...pre, Address: e.target.value }))}
                />
              </div>
            }
            {
              !!selectedTimes?.length &&
              <div className="times mb-16">
                <div className="fw-600 fw-16 mb-8">Lịch học:</div>
                {
                  selectedTimes?.map((i, idx) =>
                    <div key={idx} className="mb-4">
                      <span className="mr-2">Ngày</span>
                      <span className="mr-4">{dayjs(i?.StartTime).format("DD/MM/YYYY")}:</span>
                      <span className="mr-2">{dayjs(i?.StartTime).format("HH:ss")}</span>
                      <span className="mr-2">-</span>
                      <span>{dayjs(i?.EndTime).format("HH:ss")}</span>
                    </div>
                  )
                }
              </div>
            }
            {
              !!selectedTimes?.length &&
              <div className="mb-16">
                <span className="fw-600 fw-16 mr-4">Tổng giá:</span>
                <span className="fs-17 fw-600">{formatMoney(getRealFee(+teacher?.Price * selectedTimes.length * 1000))} VNĐ</span>
              </div>
            }
            {
              !!selectedTimes?.length &&
              (
                (bookingInfor?.LearnType === 2 && !!bookingInfor?.Address) ||
                (bookingInfor?.LearnType === 1)
              ) &&
              <ButtonCustom
                className="primary submit-btn"
                loading={loading}
                onClick={() => createPaymentLink()}
              >
                Thanh toán
              </ButtonCustom>
            }
          </MainProfileWrapper>
        </Col>
        {
          !!openModalCheckout &&
          <ModalCheckout
            open={openModalCheckout}
            onCancel={() => {
              setOpenModalCheckout(false)
              navigate("/")
            }}
          />
        }
      </Row>
    </SpinCustom>
  )
}

export default BookingPage