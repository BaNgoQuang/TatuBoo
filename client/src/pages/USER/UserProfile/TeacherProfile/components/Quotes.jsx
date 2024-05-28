import { Checkbox, Collapse, Form, Select } from "antd"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import InputCustom from "src/components/InputCustom"
import ConfirmModal from "src/components/ModalCustom/ConfirmModal"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { SYSTEM_KEY } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"

const { Option } = Select

const Quotes = ({
  loading,
  changeProfile
}) => {

  const { user, listSystemKey } = useSelector(globalSelector)

  const items = (fields) => {
    return user?.Subjects?.map((i, idx) => (
      {
        key: idx,
        label: (
          <div>
            Mô tả bài học của bạn: <span className="fw-600">{i?.SubjectName}</span>
          </div>
        ),
        children: (
          <div>
            {
              fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <div className="fw-600 mb-8">Đặt tiêu đề chủ đề</div>
                  <div className="mb-8">Tiêu đề theo chủ đề cụ thể giúp bạn thu hút sự chú ý của học sinh trong từng kỹ năng riêng biệt mà bạn dạy. Đảm bảo bao gồm những gì học sinh có thể mong đợi học, cũng như những gì khiến bạn trở nên khác biệt, từ kinh nghiệm đến cấp độ, chứng chỉ, chức danh công việc hoặc nền tảng chuyên môn.</div>
                  <Form.Item
                    style={{ width: "100%", marginRight: "8px" }}
                    {...restField}
                    name={[name, "Title"]}
                    rules={[
                      { required: true, message: "Thông tin không được để trống" },
                    ]}
                  >
                    <InputCustom placeholder="Tiêu đề" />
                  </Form.Item>
                  <div className="fw-600 mb-8">Điều gì khiến buổi học {i?.SubjectName} với bạn trở nên độc đáo?</div>
                  <div className="mb-8">Đây là điều đầu tiên một học sinh tiềm năng đọc khi họ xem hồ sơ của bạn.</div>
                  <Form.Item
                    {...restField}
                    style={{ width: "100%", marginRight: "8px" }}
                    name={[name, "Content"]}
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
                  <div className="fw-600 mb-8">Bạn dạy ở cấp độ kinh nghiệm nào?</div>
                  <Form.Item
                    name={[name, "Levels"]}
                    rules={[
                      { required: true, message: "Thông tin không được để trống" },
                    ]}
                  >
                    <Checkbox.Group>
                      {
                        getListComboKey(SYSTEM_KEY.SKILL_LEVEL, listSystemKey)?.map(i =>
                          <Checkbox
                            key={i?.ParentID}
                            value={i?.ParentID}
                          >
                            {i?.ParentName}
                          </Checkbox>
                        )
                      }
                    </Checkbox.Group>
                  </Form.Item>
                </div>
              ))
            }
            <ButtonCustom
              className="medium-size primary fw-700"
              loading={loading}
              onClick={() => changeProfile()}
            >
              {
                !!user?.Quotes?.find(item => item?.SubjectID === i?._id)
                  ? "Hoàn thành"
                  : "Lưu"
              }
            </ButtonCustom>
          </div>
        )
      }
    ))
  }

  return (
    <div className="p-12">
      <Form.List name="quotes">
        {(fields, { add, remove }) => (
          <Collapse
            items={items(fields)}
          />
        )}
      </Form.List>
    </div >
  )
}

export default Quotes