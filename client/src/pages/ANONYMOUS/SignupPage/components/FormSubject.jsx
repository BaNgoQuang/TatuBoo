import { Col, Form, Radio, Select } from "antd"
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
        <div className="center-text fs-16 mb-12">Vai trò bạn muốn gia nhập với TaTuboo?</div>
      </Col>
      <Col span={24} className="d-flex-center">
        <Form.Item
          name="RoleID"
          rules={[
            { required: true, message: "Hãy chọn vai trò của bạn" },
          ]}
        >
          <Radio.Group onChange={e => setData(pre => ({ ...pre, RoleID: e.target.value }))}>
            <Radio
              className="border-radio"
              key={3}
              value={3}
            >
              Giáo viên
            </Radio>
            <Radio
              className="border-radio"
              key={4}
              value={4}
            >
              Học sinh
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      {
        data?.RoleID === 3 &&
        <>
          <Col span={24}>
            <div className="center-text fs-16 mb-8">Chọn 1 môn học từ {subjects?.length} môn học</div>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Subject"
              rules={[
                { required: true, message: "Hãy môn học bạn muốn dạy bạn" },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn môn học"
                onChange={e => setData(pre => ({ ...pre, Subject: e }))}
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
        </>
      }
      <Col span={24}>
        <ButtonCustom
          className="primary submit-btn fs-18"
          htmlType="submit"
          loading={loading}
          onClick={async () => {
            await form.validateFields()
            handleRegister(data)
          }}
        >
          Đăng ký
        </ButtonCustom>
      </Col>
    </>
  )
}

export default FormSubject