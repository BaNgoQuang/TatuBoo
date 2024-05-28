import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { Col, Collapse, Form, Progress, Row, Tabs } from "antd"
import ProfilePhoto from "./components/ProfilePhoto"
import Description from "./components/Description"
import IntroVideo from "./components/IntroVideo"
import { useEffect, useState } from "react"
import Quotes from "./components/Quotes"
import { MainProfileStyled } from "../styled"
import TimeTable from "./components/TimeTable"
import UserService from "src/services/UserService"
import globalSlice from "src/redux/globalSlice"
import moment from "moment"
import { MONGODB_DATE_FORMATER } from "src/lib/constant"
import Notice from "src/components/Notice"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import Experiences from "./components/Experiences"
import Educations from "./components/Educations"
import { toast } from "react-toastify"

const TeacherProfile = () => {

  const dispatch = useDispatch()
  const { user } = useSelector(globalSelector)
  const [progressProfile, setProgressProfile] = useState(0)
  const [form] = Form.useForm()
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState(1)

  const handleChangeProgressProfile = (user) => {
    let total = 0
    if (!!user?.AvatarPath?.includes("res")) {
      total += Math.ceil(100 / 6)
    }
    if (!!user?.Quotes?.length) {
      total += Math.ceil(100 / 6)
    }
    if (!!user?.Experiences?.length) {
      total += Math.ceil(100 / 6)
    }
    if (!!user?.Educations?.length) {
      total += Math.ceil(100 / 6)
    }
    if (!!user?.Description) {
      total += Math.ceil(100 / 6)
    }
    if (!!user?.Price) {
      total += Math.ceil(100 / 6)
    }
    if (total > 100) {
      setProgressProfile(100)
    } else {
      setProgressProfile(total)
    }
  }

  useEffect(() => {
    handleChangeProgressProfile(user)
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      Description: user?.Description,
      Price: user?.Price,
      quotes: user?.Quotes,
      experiences: !!user?.Experiences?.length ? user?.Experiences : [{}],
      introductVideos: user?.IntroductVideos,
      educations: !!user?.Educations?.length ? user?.Educations : [{}]
    })
    if (!!user?.Schedules?.length) {
      setSchedules(
        user?.Schedules?.map(i => {
          const dayGap = moment().diff(moment(user?.Schedules[0]?.StartTime), "days")
          return {
            start: dayGap >= 5
              ? moment(i?.StartTime).add(7, "days")
              : moment(i?.StartTime),
            end: dayGap >= 5
              ? moment(i?.EndTime).add(7, "days")
              : moment(i?.EndTime),
            title: ""
          }
        })
      )
    }
  }, [])

  const changeProfile = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      if (!!schedules?.length) {
        const checkTime = schedules?.every(i => moment(i?.end).diff(moment(i.start), 'minutes') >= 90)
        if (!checkTime) {
          Notice({
            isSuccess: false,
            msg: "Thời gian dạy tối thiểu 1 buổi học là 90 phút"
          })
          return
        }
      }
      const body = {
        AvatarPath: values?.image?.file,
        Quotes: values?.quotes,
        Description: values?.Description,
        Experiences: values?.experiences?.map(i => (
          {
            Title: i?.Title,
            Content: i?.Content,
            StartDate: i?.StartDate,
            EndDate: i?.EndDate
          }
        )),
        IntroductVideos: values?.introductVideos,
        Educations: values?.educations?.map(i => (
          {
            Title: i?.Title,
            Content: i?.Content,
            StartDate: i?.StartDate,
            EndDate: i?.EndDate
          }
        )),
        Price: values?.Price,
        Schedules: !!schedules?.length
          ? schedules?.map(i => ({
            DateAt: moment(i?.start).format("dddd"),
            StartTime: moment(i?.start).format(MONGODB_DATE_FORMATER),
            EndTime: moment(i?.end).format(MONGODB_DATE_FORMATER),
          }))
          : undefined
      }
      const res = await UserService.changeProfile(body)
      if (res?.isError) return
      handleChangeProgressProfile(res?.data)
      dispatch(globalSlice.actions.setUser(res?.data))
    } finally {
      setLoading(false)
    }
  }

  const sendRequestConfirmRegister = async () => {
    try {
      setLoading(true)
      const res = await UserService.sendRequestConfirmRegister()
      if (res?.isError) return
      toast.success(res?.msg)
      dispatch(globalSlice.actions.setUser(res?.data))
    } finally {
      setLoading(false)
    }
  }

  const items = [
    {
      key: "1",
      label: (
        <div>
          Tải lên ảnh đại diện <span className="red-text">*</span>
        </div>
      ),
      children: (
        <ProfilePhoto
          loading={loading}
          changeProfile={changeProfile}
        />
      )
    },
    {
      key: "2",
      label: (
        <div>
          Cài đặt môn học<span className="red-text">*</span>
        </div>
      ),
      children: (
        <Quotes
          loading={loading}
          changeProfile={changeProfile}
        />
      )
    },
    {
      key: "3",
      label: (
        <div>
          Cài đặt lịch dạy và giá<span className="red-text">*</span>
        </div>
      ),
      children: (
        <TimeTable
          form={form}
          loading={loading}
          changeProfile={changeProfile}
          schedules={schedules}
          setSchedules={setSchedules}
        />
      )
    },
    {
      key: "4",
      label: (
        <div>
          Kinh nghiệm giảng dạy <span className="red-text">*</span>
        </div>
      ),
      children: (
        <Experiences
          loading={loading}
          changeProfile={changeProfile}
          isExperiences={true}
        />
      )
    },
    {
      key: "5",
      label: (
        <div>
          Học vấn <span className="red-text">*</span>
        </div>
      ),
      children: (
        <Educations
          loading={loading}
          changeProfile={changeProfile}
          isExperiences={false}
        />
      )
    },
    {
      key: "6",
      label: (
        <div>
          Mô tả bản thân <span className="red-text">*</span>
        </div>
      ),
      children: (
        <Description
          loading={loading}
          form={form}
          changeProfile={changeProfile}
        />
      )
    },
    {
      key: "7",
      label: (
        <div>
          Video giới thiệu
        </div>
      ),
      children: (
        <IntroVideo
          loading={loading}
          form={form}
          changeProfile={changeProfile}
        />
      )
    },
  ]

  return (
    <div>
      <div className="d-flex-sb mb-16">
        <div className="mb-12">
          <div className="fs-20 fw-600">Xin chào {user?.FullName}!</div>
          <div className="fs-14">
            Để có thể nhận học viên bạn phải hoàn thành các bước dưới đây. Đây là hồ sơ của bạn sẽ xuất hiện:
          </div>
          <div>
            <span className="red-text">*</span>
            <span className="mr-4">Lưu ý:</span>
            <span className="fs-14">Những thông tin có dấu <span className="red-text">*</span> là quan trọng. Bạn cần điền đầy đủ những trường này</span>
          </div>
        </div>
        <div>
          <Progress
            size="small"
            type="circle"
            percent={progressProfile}
          />
        </div>
      </div>
      <MainProfileStyled>
        <Row style={{ width: "100%" }} className="justify-content-space-around">
          <Col xxl={5} xl={5} lg={5} md={24} className="d-flex-center">
            <img
              src={user?.AvatarPath}
              alt=""
              style={{
                minWidth: "150px",
                height: "150px",
                borderRadius: "50%",
              }}
            />
          </Col>
          <Col span={16}>
            <div className="fs-25 fw-700 mb-50">{user?.FullName}!</div>
            <div className="d-flex-sb">
              <div className="price">
                <div className="blue-text fs-15 fw-600">Giá</div>
                <div>
                  <span className="fw-600">XXX VNĐ</span>
                  <span>/buổi</span>
                </div>
              </div>
              <div className="rating">
                <div className="blue-text fs-15 fw-600">Xếp hạng</div>
                <div>
                  <span className="fw-600">XXX sao</span>
                  <span>X reviews</span>
                </div>
              </div>
              <div className="locations">
                <div className="blue-text fs-15 fw-600">Địa điểm giảng dạy</div>
                <div>Địa điểm của bạn</div>
              </div>
            </div>
          </Col>
        </Row>
      </MainProfileStyled>
      <Form form={form} >
        <Collapse items={items} />
      </Form>
      {
        (progressProfile === 100 && user?.RegisterStatus !== 3) &&
        <ButtonCustom
          className="mt-12 primary medium-size"
          loading={loading}
          onClick={() => sendRequestConfirmRegister()}
        >
          {
            user?.RegisterStatus === 1
              ? "Gửi"
              : "Đã gửi"
          }
        </ButtonCustom>
      }
    </div >
  )
}

export default TeacherProfile