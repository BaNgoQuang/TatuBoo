import { Col, Row } from "antd"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import Router from "src/routers"

const ModalDetailSchedule = ({ open, onCancel }) => {

  const navigate = useNavigate()

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Chi tiết lịch học"
      width="40vw"
      footer={
        <div className="d-flex-end">
          <ButtonCustom
            className="third"
            onClick={() => onCancel()}
          >
            Đóng
          </ButtonCustom>
        </div>
      }
    >
      <div className="d-flex-center">
        <Row>
          <Col span={4}>
            <div>Ngày học:</div>
          </Col>
          <Col span={20}>
            <div>{moment(open?.DateAt).format("dddd DD/MM/YYYY")}</div>
          </Col>
          <Col span={4}>
            <div>Thời gian:</div>
          </Col>
          <Col span={20}>
            <div>{moment(open?.StartTime).format("HH:ss")} - {moment(open?.EndTime).format("HH:ss")}</div>
          </Col>
          <Col span={4}>
            <div>Giáo viên:</div>
          </Col>
          <Col span={20}>
            <div
              onClick={() => navigate(`${Router.GIAO_VIEN}/${open?.Teacher?._id}${Router.MON_HOC}/${open?.Subject?._id}`)}
              className="blue-text cursor-pointer"
            >
              {open?.Teacher?.FullName}
            </div>
          </Col>
          <Col span={4}>
            <div>Môn học:</div>
          </Col>
          <Col span={20}>
            <div>{open?.Subject?.SubjectName}</div>
          </Col>
        </Row>
      </div>
    </ModalCustom>
  )
}

export default ModalDetailSchedule