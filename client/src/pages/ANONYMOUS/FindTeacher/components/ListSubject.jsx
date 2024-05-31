import { Card, Col, Row, Typography } from "antd"
import { ListSubjectContainer } from "../styled";

const { Title, Paragraph } = Typography

const coursesData = [
  { id: 1, name: 'Piano', imageUrl: '/path/to/your/image.jpg' },
  { id: 2, name: 'Piano', imageUrl: '/path/to/your/image.jpg' },
  { id: 3, name: 'Piano', imageUrl: '/path/to/your/image.jpg' },
  { id: 4, name: 'Piano', imageUrl: '/path/to/your/image.jpg' },
  { id: 5, name: 'Piano', imageUrl: '/path/to/your/image.jpg' },
  { id: 6, name: 'Piano', imageUrl: '/path/to/your/image.jpg' },
  { id: 7, name: 'Piano', imageUrl: '/path/to/your/image.jpg' },
  { id: 8, name: 'Piano', imageUrl: '/path/to/your/image.jpg' },
];

const ListSubject = () => {
  return (
    <ListSubjectContainer>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3}>
            Danh sách môn học
          </Title>
          <Paragraph >
            Với nhiều cách học, hãy tìm thứ gì đó phù hợp với thời gian, trình độ và ngân sách của bạn
          </Paragraph>
        </Col>
        <Col span={24} className="center-text">
          <Row gutter={[16, 16]}>
            {coursesData.map(course => (
              <Col key={course.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  cover={<img alt={course.name} src={course.imageUrl} />}
                  bordered={false}
                >
                  <Card.Meta title={course.name} />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </ListSubjectContainer>
  )
}

export default ListSubject