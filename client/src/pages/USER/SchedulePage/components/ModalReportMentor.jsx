import { Col, Form, Input, Row, Space } from "antd"
import { useState } from "react"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import SpinCustom from "src/components/SpinCustom"
import ReportsService from "src/services/ReportsService"

const ModalReportMentor = ({ open, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  console.log("open", open);
  const HandleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const body = {
        ...values,
        Author: open?.Student?._id,
      }
      const res = await ReportsService.createReport(body)
      if (res?.isError) return toast.error(res?.msg)
      onCancel()
      toast.success(res?.msg)
    } catch (error) {
      console.log("Error", error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Báo cáo giáo viên"
      width="35vw"
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
              className="primary"
              onClick={() => HandleSubmit()}
            >
              Gửi
            </ButtonCustom>
          </Space>
        </div >
      }
    >
      <SpinCustom spinning={loading}>
        <Form
          form={form}
          layout="vertical"
        // initialValues={{}}
        >
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name="Title"
                label="Tiêu đề:"
                rules={[
                  { required: true, message: "Thông tin không được để trống!" }
                ]}
              >
                <InputCustom />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Context"
                label="Mô tả nội dung chi tiết:"
                rules={[
                  { required: true, message: "Thông tin không được để trống!" }
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </SpinCustom>
    </ModalCustom >
  );
}

export default ModalReportMentor;