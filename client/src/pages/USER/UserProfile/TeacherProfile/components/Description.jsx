import { Form } from "antd"
import { useSelector } from "react-redux"
import InputCustom from "src/components/InputCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { globalSelector } from "src/redux/selector"

const Description = ({
  loading,
  changeProfile,
}) => {

  const { user } = useSelector(globalSelector)

  return (
    <div>
      <div className="fw-600 mb-8">Hãy nói gì đó với học sinh của bạn</div>
      <Form.Item
        style={{ width: "100%", marginRight: "8px" }}
        name="Description"
        rules={[
          { required: true, message: "Thông tin không được để trống" },
        ]}
      >
        <InputCustom
          style={{ width: "100%" }}
          type="isTextArea"
        />
      </Form.Item>
      <ButtonCustom
        className="medium-size primary fw-700"
        loading={loading}
        onClick={() => changeProfile()}
      >
        {
          !!user?.Description
            ? "Hoàn thành"
            : "Lưu"
        }
      </ButtonCustom>
    </div>
  )
}

export default Description