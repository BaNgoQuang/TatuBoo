import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { Col, Collapse, Form, Progress, Row, Tabs } from "antd"
import ProfilePhoto from "./components/ProfilePhoto"
import Experiences from "./components/Experiences"
import Educations from "./components/Educations"
import Description from "./components/Description"
import IntroVideo from "./components/IntroVideo"
import { useEffect, useState } from "react"
import Quotes from "./components/Quotes"
import { MainProfileStyled } from "../styled"
import TimeTable from "./components/TimeTable"
import UserService from "src/services/UserService"
import globalSlice from "src/redux/globalSlice"

const TeacherProfile = () => {

  const dispatch = useDispatch()
  const { user } = useSelector(globalSelector)
  const [progressProfile, setProgressProfile] = useState(0)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState(1)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (user?.RegisterStatus === 3) {
      form.setFieldsValue(user)
    }
  }, [])

  const changeProfile = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const body = {
        AvatarPath: values?.image?.file,
        Quotes: values?.Quotes,
        Description: values?.Description,
        Experiences: values?.Experiences,
        IntroductVideos: values?.IntroductVideos,
        Educations: values?.Educations
      }
      console.log("body", body);
      // const res = await UserService.changeProfile(body)
      // if (res?.isError) return
      // if (currentTab !== 6) {
      //   const total = Math.ceil(100 / 6)
      //   if ((progressProfile + total) > 100) {
      //     setProgressProfile(100)
      //   } else {
      //     setProgressProfile(progressProfile + total)
      //   }
      // }
      // dispatch(globalSlice.actions.setUser(res?.data))
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
          form={form}
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
          loading={loading}
          form={form}
          changeProfile={changeProfile}
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
          form={form}
          changeProfile={changeProfile}
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
          form={form}
          changeProfile={changeProfile}
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
        <Row className="justify-content-space-around">
          <Col span={4}>
            <img
              src={user?.AvatarPath}
              alt=""
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%"
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
      <Form
        form={form}
        initialValues={{
          Quotes: [{}],
        }}
      >
        <Collapse items={items} />
      </Form>
      {/* {
        !!user?.Quotes?.length &&
        !!user?.Description &&
        !!user?.Experiences?.length &&

      } */}
    </div>
  )
}

export default TeacherProfile