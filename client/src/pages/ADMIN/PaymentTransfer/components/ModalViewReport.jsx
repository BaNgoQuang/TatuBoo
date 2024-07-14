import { Col, Row, Space } from "antd"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import dayjs from "dayjs"
import React from "react"

const ModalViewReport = ({ open, onCancel }) => {

  console.log("open", open);

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Chi tiết báo cáo"
      width="70vw"
      footer={
        <div className="d-flex-end">
          <Space>
            <ButtonCustom
              className="third"
              onClick={() => onCancel()}
            >
              Đóng
            </ButtonCustom>
          </Space>
        </div >
      }
    >
      <Row gutter={[16, 8]}>
        {
          !!open?.RequestAxplanationAt &&
          <Col span={24}>
            <div className="d-flex-end">Đã gửi yêu cầu giải trình ngày: {dayjs(open?.RequestAxplanationAt).format("DD/MM/YYYY HH:mm")}</div>
          </Col>
        }
        {
          open?.Reports?.map((i, idx) =>
            <React.Fragment key={idx}>
              <Col span={24}>
                <div className="center-text fs-18 fw-700">Lần báo số {idx + 1}</div>
              </Col>
              <Col span={5}>
                <div>Người báo cáo:</div>
              </Col>
              <Col span={17}>
                <div>{i?.Sender?.FullName}</div>
              </Col>
              <Col span={5}>
                <div>Người bị báo cáo:</div>
              </Col>
              <Col span={17}>
                <div>{i?.Teacher?.FullName}</div>
              </Col>
              <Col span={5}>
                <div>Buổi học vào ngày:</div>
              </Col>
              <Col span={17}>
                <div>
                  {
                    dayjs(open?.TimeTables?.find(item => item?._id === i?.Timetable)?.DateAt).format("DD/MM/YYYY")
                  }
                </div>
              </Col>
              <Col span={5}>
                <div>Bắt đầu lúc:</div>
              </Col>
              <Col span={17}>
                <div>
                  {
                    dayjs(open?.TimeTables?.find(item => item?._id === i?.Timetable)?.StartTime).format("HH:mm")
                  }
                </div>
              </Col>
              <Col span={5}>
                <div>Kết thúc lúc:</div>
              </Col>
              <Col span={17}>
                <div>
                  {
                    dayjs(open?.TimeTables?.find(item => item?._id === i?.Timetable)?.EndTime).format("HH:mm")
                  }
                </div>
              </Col>
              <Col span={5}>
                <div>Tiêu đề báo cáo:</div>
              </Col>
              <Col span={17}>
                <div>{i?.Title}</div>
              </Col>
              <Col span={5}>
                <div>Nội dung báo cáo:</div>
              </Col>
              <Col span={17}>
                <div>{i?.Content}</div>
              </Col>
            </React.Fragment>
          )
        }
      </Row>
    </ModalCustom >
  )
}

export default ModalViewReport