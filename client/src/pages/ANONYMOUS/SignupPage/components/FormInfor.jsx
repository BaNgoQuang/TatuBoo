import { useGoogleLogin } from "@react-oauth/google"
import { Col, Form, Radio } from "antd"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { getRegexEmail } from "src/lib/stringUtils"
import UserService from "src/services/UserService"

const FormInfor = ({
  form,
  data,
  setData,
  current,
  setCurrent,
  handleRegister,
  loading
}) => {

  const validateByForm = async () => {
    const values = await form.validateFields()
    if (values?.RoleID === 3) {
      setData({ ...values, IsByGoogle: false })
      setCurrent(current + 1)
    } else {
      handleRegister()
    }
  }

  const validateByGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfor = await UserService.getInforByGoogleLogin(tokenResponse?.access_token)
      setData({ ...data, ...userInfor, IsByGoogle: true })
      await form.validateFields()
      if (!!userInfor) {
        if (data?.RoleID === 3) {
          setCurrent(current + 1)
        } else {
          handleRegister()
        }
      } else {
        return toast.error("Have something error")
      }
    },
  })

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
          <Radio.Group onChange={e => setData({ ...data, RoleID: e.target.value })}>
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
      <Col span={24}>
        <Form.Item
          name="FullName"
          rules={[
            { required: !!data?.IsByGoogle ? false : true, message: "Hãy nhập vào tên của bạn" },
          ]}
        >
          <InputCustom
            onChange={e => setData({ ...data, FullName: e.target.value })}
            placeholder="Họ và tên"
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="Email"
          rules={[
            { required: !!data?.IsByGoogle ? false : true, message: "Hãy nhập vào email của bạn" },
            { pattern: getRegexEmail(), message: "Email sai định dạng" }
          ]}
        >
          <InputCustom
            onChange={e => setData({ ...data, Email: e.target.value })}
            placeholder="Email"
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <ButtonCustom
          className="primary submit-btn fs-18"
          htmlType="submit"
          onClick={() => validateByForm()}
          loading={loading}
        >
          {
            data?.RoleID === 4
              ? "Đăng ký"
              : "Tiếp theo"
          }
        </ButtonCustom>
      </Col>
      <Col span={24}>
        <div className="center-text  gray-text fs-20 mt-10 mb-10">
          OR
        </div>
      </Col>
      <Col span={24}>
        <ButtonCustom
          className="d-flex-center login-google mb-15"
          onClick={() => {
            setData({ ...data, IsByGoogle: true })
            validateByGoogle()
          }}
        >
          <span className="icon-google"></span>
          <span className="ml-12">Sign up with Google</span>
        </ButtonCustom>
      </Col>
    </>
  )
}

export default FormInfor