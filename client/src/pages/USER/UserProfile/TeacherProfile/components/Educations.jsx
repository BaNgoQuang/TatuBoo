import { Col, Form, Row } from "antd"
import { useSelector } from "react-redux"
import InputCustom from "src/components/InputCustom"
import ListIcons from "src/components/ListIcons"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { globalSelector } from "src/redux/selector"


const Educations = ({
  loading,
  changeProfile,
}) => {

  const { user } = useSelector(globalSelector)

  return (
    <div className="p-12">
      <div className='fw-600 fs-16 mb-12'>
        Hãy cho học sinh biết học vấn của bạn. Điều đó có thể thu hút sự chú ý của họ
      </div>
      <Form.List name="educations">
        {(fields, { add, remove }) => (
          <div>
            {
              fields.map(({ key, name, ...restField }) => (
                <Row key={key} className="d-flex-sb" gutter={[16]} >
                  <Col span={7}>
                    <div className="fw-600 mb-8">Bạn từng học gì khoảng thời gian nào</div>
                    <Form.Item
                      style={{ width: "100%", marginRight: "8px" }}
                      {...restField}
                      name={[name, `StartDate`]}
                      rules={[
                        { required: true, message: "Thông tin không được để trống" },
                      ]}
                    >
                      <InputCustom className="mb-8" placeholder="Từ Tháng 2, 2016" />
                    </Form.Item>
                    <Form.Item
                      style={{ width: "100%", marginRight: "8px" }}
                      {...restField}
                      name={[name, `EndDate`]}
                      rules={[
                        { required: true, message: "Thông tin không được để trống" },
                      ]}
                    >
                      <InputCustom placeholder="Đến Tháng 4, 2020 or Bây giờ" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <div className="fw-600 mb-8">Bạn đã từng học gì</div>
                    <Form.Item
                      name={[name, `Title`]}
                      rules={[
                        { required: true, message: "Thông tin không được để trống" },
                      ]}
                    >
                      <InputCustom />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <div className="fw-600 mb-8">Mô tả về quá trình học của bạn</div>
                    <Form.Item
                      {...restField}
                      style={{ width: "100%", marginRight: "8px" }}
                      name={[name, `Content`]}
                      rules={[
                        { required: true, message: "Thông tin không được để trống" },
                      ]}
                    >
                      <InputCustom
                        type="isTextArea"
                        placeholder="Mô tả"
                        style={{ height: "100px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <ButtonCircle
                      icon={ListIcons.ICON_DELETE}
                      onClick={() => remove(name)}
                    />
                  </Col>
                </Row>
              ))
            }
            <div className="d-flex-end">
              <ButtonCustom
                className="third fw-700"
                onClick={() => add()}
              >
                Thêm
              </ButtonCustom>
            </div>
          </div>
        )}
      </Form.List>

      <ButtonCustom
        className="medium-size primary fw-700"
        loading={loading}
        onClick={() => changeProfile()}
      >
        {
          !!user?.Educations?.length
            ? "Hoàn thành"
            : "Lưu"
        }
      </ButtonCustom>
    </div>
  )
}

export default Educations