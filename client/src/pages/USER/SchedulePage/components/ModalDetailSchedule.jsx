import { Col, Row, Space } from "antd"
import moment from "moment"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { Roles, SYSTEM_KEY } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"
import TimeTableService from "src/services/TimeTableService"
import dayjs from "dayjs"

const ModalDetailSchedule = ({ open, onCancel }) => {

  const navigate = useNavigate()
  const { user, listSystemKey } = useSelector(globalSelector)
  const [loading, setLoading] = useState(false)

  const handleAttendanceTimeTable = async () => {
    try {
      setLoading(true)
      const res = await TimeTableService.attendanceTimeTable(open?._id)
      if (res?.isError) return
      toast.success(res?.msg)
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Chi tiết lịch học"
      width="40vw"
      footer={
        <div className="d-flex-end">
          <Space>
            <ButtonCustom
              className="third"
              onClick={() => onCancel()}
            >
              Đóng
            </ButtonCustom>
            <ButtonCustom
              loading={loading}
              disabled={
                (dayjs(open?.StartTime).format("DD/MM/YYYY HH: ss") === dayjs(Date.now).format("DD/MM/YYYY HH: ss") ||
                  !!open?.Status)
                  ? true : false
              }
              className="primary"
              onClick={() => handleAttendanceTimeTable()}
            >
              Điểm danh
            </ButtonCustom>
          </Space>
        </div >
      }
    >
      <div className="d-flex-center">
        <Row>
          <Col span={5}>
            <div>Ngày học:</div>
          </Col>
          <Col span={19}>
            <div>{moment(open?.DateAt).format("dddd DD/MM/YYYY")}</div>
          </Col>
          <Col span={5}>
            <div>Thời gian:</div>
          </Col>
          <Col span={19}>
            <div>{moment(open?.StartTime).format("HH:ss")} - {moment(open?.EndTime).format("HH:ss")}</div>
          </Col>
          <Col span={5}>
            <div>{user?.RoleID === Roles.ROLE_STUDENT ? "Giáo viên" : "Học sinh"}</div>
          </Col>
          <Col span={19}>
            <div
              onClick={() => {
                if (user?.RoleID === Roles.ROLE_STUDENT) {
                  navigate(`${Router.GIAO_VIEN}/${open?.Teacher?._id}${Router.MON_HOC}/${open?.Subject?._id}`)
                }
              }}
              className={user?.RoleID === Roles.ROLE_STUDENT ? "blue-text cursor-pointer" : ""}
            >
              {open[user?.RoleID === Roles.ROLE_STUDENT ? "Teacher" : "Student"]?.FullName}
            </div>
          </Col>
          <Col span={5}>
            <div>Môn học:</div>
          </Col>
          <Col span={19}>
            <div>{open?.Subject?.SubjectName}</div>
          </Col>
          <Col span={5}>
            <div>Hình thức học:</div>
          </Col>
          <Col span={19}>
            <div>
              {
                getListComboKey(SYSTEM_KEY.LEARN_TYPE, listSystemKey)
                  ?.find(i => i?.ParentID === open?.LearnType)?.ParentName
              }
            </div>
          </Col>
        </Row>
      </div>
    </ModalCustom >
  )
}

export default ModalDetailSchedule