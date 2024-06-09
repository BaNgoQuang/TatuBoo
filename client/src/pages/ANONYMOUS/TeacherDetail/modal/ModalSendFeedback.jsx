import { Col, Form, Rate, Row } from "antd"
import InputCustom from "src/components/InputCustom"
import ModalCustom from "src/components/ModalCustom"

const ModalSendFeedback = ({ open, onCancel, onOk }) => {

  const [form] = Form.useForm()

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Gửi đánh giá giáo viên"
      width="50vw"
    >
      <Form form={form}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Vote cho giáo viên"
              name="Rate"
            >
              <Rate />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Viết nội dung đánh giá"
              name="Content"
            >
              <InputCustom type="isTextArea" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default ModalSendFeedback