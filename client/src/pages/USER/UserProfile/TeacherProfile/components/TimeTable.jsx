
import { Col, Form, Input, InputNumber, Row } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useSelector } from 'react-redux'
import ButtonCustom from 'src/components/MyButton/ButtonCustom'
import { formatMoney } from 'src/lib/stringUtils'
import { globalSelector } from 'src/redux/selector'

const localizer = momentLocalizer(moment)

const formats = {
  monthHeaderFormat: () => { }, // Định dạng tiêu đề tháng
  dayFormat: "ddd", // Định dạng hiển thị ngày trong ngày
  dayHeaderFormat: () => { }, // Tiêu đề nagyf
  dayRangeHeaderFormat: () => { }, // Định dạng tiêu đề ngày khi chọn khoảng thời gian
  agendaDateFormat: () => { }, //Cột trong lịch làm việc
}

const TimeTable = ({
  form,
  loading,
  changeProfile,
  schedules,
  setSchedules,
}) => {

  const { user } = useSelector(globalSelector)
  const [totalFee, setTotalFee] = useState(0)

  useEffect(() => {
    if (!!user?.Price) {
      setTotalFee(user?.Price * 1000 + user?.Price * 1000 * 20 / 100)
    }
  }, [])

  const handleSelectSlot = ({ start, end }) => {
    setSchedules((prev) => [...prev, { start, end, title: "" }])
  }

  const handleSelectEvent = ({ start }) => {
    const schedule = schedules?.find(i => i?.start === start)
    const newData = schedules?.filter(i => i?.start !== schedule?.start)
    setSchedules(newData)
  }

  return (
    <div>
      <div className='fw-600 fs-16'>Chọn thời gian biểu cho bạn</div>
      <div className='fs-14 gray-text mb-12'>
        Chọn thời gian rảnh của bạn cho từng địa điểm giảng dạy mà bạn đã chọn trước đó. Học sinh sẽ chỉ có thể yêu cầu giờ học trong số giờ trên lịch sẵn có của bạn. Để thu hút được nhiều học sinh nhất, hãy đảm bảo bạn có ít nhất 10 giờ học.
      </div>
      <Form.Item
        name='Schedules'
        rules={[
          { required: !!schedules?.length ? false : true, message: "Hãy chọn thời gian biểu cho mình" },
        ]}
      >
        <Calendar
          localizer={localizer}
          startAccessor={event => {
            return new Date(event.start)
          }}
          endAccessor={event => {
            return new Date(event.end)
          }}
          style={{ width: "100%", height: 700 }}
          toolbar={false}
          defaultView={Views.WEEK}
          formats={formats}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          events={schedules}
          onShowMore={(schedules, date) =>
            this.setState({ showModal: true, schedules })
          }
        />
      </Form.Item>
      <div className='fw-600 fs-16'>Chọn số tiền bạn muốn kiếm được cho mỗi buổi học</div>
      <div className='fs-14 gray-text mb-12'>
        Nhập số tiền bạn muốn kiếm được cho mỗi buổi học bạn dạy và chúng tôi sẽ cộng chi phí tiếp thị và dịch vụ của chúng tôi để tính mức giá mà học sinh phải trả.
      </div>
      <div className='mb-16'>
        <Row>
          <Col xxl={3} xl={4} lg={6} md={8} sm={10} xs={12}>
            <div className='fw-600 fs-14 mb-8'>Số tiền bạn nhận được</div>
            <Form.Item
              name='Price'
              rules={[
                {
                  validator: (rule, value) => {
                    if (!value) {
                      return Promise.reject("Thông tin không được để trống")
                    }
                    const fee = parseInt(value)
                    if (isNaN(fee)) {
                      return Promise.reject("Vui lòng nhập vào số")
                    } else if (fee < 150) {
                      return Promise.reject("Số nhập vào phải lớn hơn hoặc bằng 150")
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input
                suffix=".000 VNĐ"
                onBlur={e => {
                  form.setFieldValue("Price", formatMoney(e.target.value))
                }}
                onChange={e => setTotalFee(e.target.value * 1000 + e.target.value * 1000 * 20 / 100)}
              />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <div className='fw-600 fs-13'>Số tiền học sinh cần trả</div>
          <div>
            <span>{formatMoney(totalFee)}</span>
            <span> VNĐ</span>
          </div>
        </div>
      </div>
      <ButtonCustom
        className="medium-size primary fw-700"
        loading={loading}
        onClick={() => changeProfile()}
      >
        {
          !!user?.Schedules?.length && !!user?.Price
            ? "Hoàn thành"
            : "Lưu"
        }
      </ButtonCustom>
    </div>
  )
}

export default TimeTable
