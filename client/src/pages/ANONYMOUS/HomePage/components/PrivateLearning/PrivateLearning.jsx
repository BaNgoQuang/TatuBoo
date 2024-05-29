import { Col, Row, Typography } from "antd";
import CourseProfile from "./PrivateLearningItem";

const coursesData = [
  {
    id: 1,
    title: "Trending #1 at Linsgale",
    description: "Ergonomics and meeting style focus...",
    imageUrl: "/path/to/profile-image-1.jpg", // Replace with the actual image path
  },
  {
    id: 2,
    title: "Trending #1 at Linsgale",
    description: "Ergonomics and meeting style focus...",
    imageUrl: "/path/to/profile-image-2.jpg", // Replace with the actual image path
  },
  {
    id: 3,
    title: "Trending #1 at Linsgale",
    description: "Ergonomics and meeting style focus...",
    imageUrl: "/path/to/profile-image-3.jpg", // Replace with the actual image path
  },
]

const { Title, Paragraph } = Typography

const PrivateLearning = () => {


  return (
    <Row gutter={[16, 16]}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Title level={2} >Lớp học riêng tư với những giảng viên tốt nhất</Title>
        <Paragraph>Học tập 1:1 với giảng viên đáng tin cậy, trực tiếp hoặc trực tuyến.</Paragraph>
      </Col>
      {
        coursesData?.map((index, course) => (
          <Col key={index} xs={24} sm={12} md={8} xl={8}>
            <CourseProfile
              key={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
            />
          </Col>
        ))
      }
    </Row>
  )
}

export default PrivateLearning;