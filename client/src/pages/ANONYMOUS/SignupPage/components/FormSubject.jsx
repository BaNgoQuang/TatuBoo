import { Col, Form, Select } from "antd"
import { useSelector } from "react-redux"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { globalSelector } from "src/redux/selector"

const { Option } = Select

const FormSubject = ({
  form,
  data,
  setData,
  handleRegister,
  loading
}) => {

  const { subjects } = useSelector(globalSelector)

  return (
    <>
      <Col span={24}>
        <div className="center-text fs-16 mb-8">Chọn 1 môn học từ {subjects?.length} môn học</div>
      </Col>
      <Col span={24}>
        <Form.Item
          name="Subject"
          rules={[
            { required: true, message: "Hãy nhập vào tên của bạn" },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn môn học"
            onChange={e => setData({ ...data, Subject: e })}
            filterOption={(input, option) =>
              option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              subjects?.map(i =>
                <Option
                  key={i?._id}
                  value={i?._id}
                >
                  {i?.SubjectName}
                </Option>
              )
            }
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <ButtonCustom
          className="primary submit-btn fs-18"
          htmlType="submit"
          loading={loading}
          onClick={async () => {
            await form.validateFields()
            handleRegister()
          }}
        >
          Đăng ký
        </ButtonCustom>
      </Col>
    </>
  )
}

export default FormSubject