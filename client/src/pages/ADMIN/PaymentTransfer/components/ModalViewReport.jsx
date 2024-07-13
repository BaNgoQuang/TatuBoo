import { Col, Row, Space } from "antd"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"

const ModalViewReport = ({ open, onCancel, handleSendRequestExplanation }) => {

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
            <ButtonCustom
              // loading={loading}
              className="primary"
              onClick={() => handleSendRequestExplanation()}
            >
              Gửi yêu cầu giải trình
            </ButtonCustom>
          </Space>
        </div >
      }
    >
      <Row gutter={[16, 16]}>
        {
          open?.Reports?.map((i, idx) =>
            <div key={idx} className="mb-12">
              <Col span={24}>
                <div>Lần báo số {idx + 1}</div>
              </Col>
              <Col span={5}>
                <div>Người báo cáo:</div>
              </Col>
              <Col span={17}>
                <div>{ }</div>
              </Col>
            </div>
          )
        }
      </Row>
    </ModalCustom>
  )
}

export default ModalViewReport