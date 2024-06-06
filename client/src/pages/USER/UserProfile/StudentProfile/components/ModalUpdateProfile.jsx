import { Col, Form, Row, Upload, message } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import InputCustom from "src/components/InputCustom"
import ModalCustom from "src/components/ModalCustom"
import { globalSelector } from "src/redux/selector"

const ModalUpdateProfile = ({ open, onCancel, onOk }) => {

  const [form] = Form.useForm()
  const { user } = useSelector(globalSelector)
  const [preview, setPreview] = useState()

  const handleBeforeUpload = (file) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]
    const isAllowedType = allowedImageTypes.includes(file.type)
    if (!isAllowedType) {
      message.error("Yêu cầu chọn file ảnh (jpg, png, gif)")
    } else {
      setPreview(URL.createObjectURL(file))
    }
    return isAllowedType ? false : Upload.LIST_IGNORE
  }

  useEffect(() => {
    form.setFieldsValue(user)
  }, [])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title="Chỉnh sửa thông tin cá nhân"
      width="70vw"
    >
      <Form form={form}>
        <Row>
          <Col span={24}>
            <Form.Item
              name='image'
            >
              <Upload.Dragger
                beforeUpload={file => handleBeforeUpload(file)}
                style={{ width: '300px', height: '300px' }}
                accept="image/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <div >
                  Chọn ảnh đại diện cho bạn
                </div>
                <img
                  style={{ width: '100%', height: '300px' }}
                  src={!!preview ? preview : user?.AvatarPath}
                  alt=""
                />
              </Upload.Dragger>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='FullName'
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <InputCustom placeholder="Nhập vào họ và tên" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='Address'
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <InputCustom placeholder="Nhập vào họ và tên" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  )
}

export default ModalUpdateProfile