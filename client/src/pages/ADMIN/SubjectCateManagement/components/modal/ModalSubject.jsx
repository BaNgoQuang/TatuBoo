import { Col, Form, Row, Space } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ModalCustom from "src/components/Modal/ModalCustom"
import CustomButton from "src/components/MyButton/ButtonCustom"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/SpinCustom"
import SubjectCateService from "src/services/SubjectCateService"
import styled from "styled-components"

const StyleModal = styled.div`
  .ant-form-item-label {
    width: 50%;
    text-align: left;
  }
`

const ModalAddAndEditSubject = ({ open, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!!open?._id) {
      form.setFieldsValue({
        ...open,
      })
    }
  }, [open])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = !!open?.id
        ? await form.getFieldValue()
        : await form.validateFields()
      const body = {
        ...values,
      }
      const res = !!open?._id
        ? await SubjectCateService.updateNest(body)
        : await SubjectCateService.createSubjectCate(body)
      if (res?.isError) return toast.error(res?.msg)
      onCancel()
      toast.success(res?.msg)
      onOk()
    } finally {
      setLoading(false)
    }
  }


  const renderFooter = () => (
    <div className="d-flex-center">
      <Space direction="horizontal">
        <CustomButton
          btnType="submit"
          onClick={() => {
            handleSubmit()
          }}
        >
          Ghi lại
        </CustomButton>
        <CustomButton btnType="cancel" onClick={onCancel}>
          Đóng
        </CustomButton>
      </Space>
    </div>
  )


  return (
    <ModalCustom
      title={!open?._id ? "Thêm mới môn học" : "Cập nhật môn học"}
      width={900}
      open={open}
      onCancel={onCancel}
      footer={renderFooter()}
    >
      <SpinCustom spinning={loading}>
        <StyleModal>
          <Form form={form} layout="vertical" initialValues={{}}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="SubjectName"
                  label="Tên môn học:"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <InputCustom
                    label="Tên môn học:"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="AvatarPath"
                  label="Ảnh minh hoạ:"
                >
                  <InputCustom type="isTextArea" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </StyleModal>
      </SpinCustom>
    </ModalCustom>
  )
}

export default ModalAddAndEditSubject
