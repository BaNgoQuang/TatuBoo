import { Checkbox, Col, DatePicker, Empty, Radio, Row } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SpinCustom from "src/components/SpinCustom"
import UserService from "src/services/UserService"
import { MainProfileWrapper } from "../TeacherDetail/styled"
import moment from "moment"
import { TimeItemStyled } from "./styled"
import dayjs from "dayjs"
import { MONGODB_DATE_FORMATER, SYSTEM_KEY } from "src/lib/constant"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { getListComboKey } from "src/lib/commonFunction"
import InputCustom from "src/components/InputCustom"

const BookingPage = () => {

  const { TeacherID, SubjectID } = useParams()
  const { listSystemKey } = useSelector(globalSelector)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [teacher, setTeacher] = useState()
  const [subject, setSubject] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [selectedTimes, setSelectedTimes] = useState([])
  const [bookingInfor, setBookingInfor] = useState()
  const [times, setTimes] = useState([])

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
    const dayGap = moment(dayjs(selectedDate).startOf("day")).diff(moment(dayjs(date?.StartTime).startOf("day")), "days")
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
  console.log("selectTimes", selectedTimes);
  useEffect(() => {
    getDetailTeacher()
  }, [TeacherID, SubjectID])

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
              <div className="address">
                <InputCustom
                  placeholder="Nhập vào địa chỉ"
                  onChange={e => setBookingInfor(pre => ({ ...pre, Address: e.target.value }))}
                />
              </div>
            }
            {
              !!selectedTimes?.length &&
              <div className="times">
                <div className="fw-600 fw-16">Lịch học:</div>

              </div>
            }
          </MainProfileWrapper>
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default BookingPage