import { Col, Row, Space } from "antd"
import { useState } from "react"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import SpinCustom from "src/components/SpinCustom"
import { formatMoney } from "src/lib/stringUtils"
import PaymentService from "src/services/PaymentService"

const ModalPaymentTransfer = ({ open, onCancel, onOk }) => {

  const [loading, setLoading] = useState(false)

  const handleCompleteTransfer = async () => {
    try {
      setLoading(true)
      const res = await PaymentService.changePaymentStatus({
        PaymentID: open?.PaymentID,
        PaymentStatus: 2,
        TotalFee: open?.TotalFee,
        FullName: open?.FullName,
        Email: open?.Email
      })
      if (!!res?.isError) return
      onCancel()
      onOk()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalCustom
      title="Xác nhận thanh toán"
      closable
      open={open}
      onCancel={onCancel}
      width="60vw"
      footer={
        <div className="d-flex-end">
          <Space>
            <ButtonCustom
              onClick={() => onCancel()}
            >
              Đóng
            </ButtonCustom>
            <ButtonCustom
              className="primary"
              onClick={() => handleCompleteTransfer()}
            >
              Xác nhận thanh toán
            </ButtonCustom>
          </Space>
        </div>
      }
    >
      <SpinCustom spinning={loading}>
        <Row gutter={[16, 16]} className="d-flex-center">
          <Col span={20}>
            <div className="d-flex">
              <img
                src={open?.BankImgae}
                alt=""
                style={{
                  width: "120px",
                  height: "80px"
                }}
              />
              <div className="mb-8">
                <div className="fw-600 gray-text">Ngân hàng</div>
                <div className="fw-700 fs-17">{open?.BankName}</div>
              </div>
            </div>
            <div className="mb-8">
              <div className="fw-600 gray-text">Chủ tài khoản</div>
              <div className="fw-700 fs-17">{open?.UserBankName}</div>
            </div>
            <div className="mb-8">
              <div className="fw-600 gray-text">Số tài khoản</div>
              <div className="fw-700 fs-17">{open?.UserBankAccount}</div>
            </div>
            <div className="mb-8">
              <div className="fw-600 gray-text">Số tiền</div>
              <div className="fw-700 fs-17">{formatMoney(open?.TotalFee)} VNĐ</div>
            </div>
            <div>
              <div className="fw-600 gray-text">Nội dung</div>
              <div className="fw-700 fs-17">{open?.Description}</div>
            </div>
          </Col>
        </Row>
      </SpinCustom>
    </ModalCustom>
  )
}

export default ModalPaymentTransfer