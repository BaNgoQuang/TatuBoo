import { Avatar, Button, Checkbox, Col, Row, Select, Slider, Space, Typography } from "antd"
import { DayButton, DayContainer, FilterSection, FilterTitle, MentorForSubjectContainer, Sidebar, StyledCard, TimeSlotButton } from "./styled"
import { UserOutlined } from '@ant-design/icons'
import { FaChalkboardTeacher, FaHome } from 'react-icons/fa';

import Search from "./components/Search"

const { Title, Paragraph, Text } = Typography
const { Option } = Select

const data = [
  {
    id: 1,
    title: 'Koudetat à la Maison #1 (L\'intégrale)',
    description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
    author: 'Annette Black',
    authorTitle: 'Director, Producer',
    imageUrl: '/path/to/image.jpg'
  },
  {
    id: 2,
    title: 'Koudetat à la Maison #1 (L\'intégrale)',
    description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
    author: 'Annette Black',
    authorTitle: 'Director, Producer',
    imageUrl: '/path/to/image.jpg'
  },
  {
    id: 3,
    title: 'Koudetat à la Maison #1 (L\'intégrale)',
    description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
    author: 'Annette Black',
    authorTitle: 'Director, Producer',
    imageUrl: '/path/to/image.jpg'
  },
  {
    id: 4,
    title: 'Koudetat à la Maison #1 (L\'intégrale)',
    description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
    author: 'Annette Black',
    authorTitle: 'Director, Producer',
    imageUrl: '/path/to/image.jpg'
  },
  {
    id: 5,
    title: 'Koudetat à la Maison #1 (L\'intégrale)',
    description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
    author: 'Annette Black',
    authorTitle: 'Director, Producer',
    imageUrl: '/path/to/image.jpg'
  },

];


const MentorForSubject = () => {
  return (
    <MentorForSubjectContainer>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Search />
        </Col>
        <Col className="mt-60" xs={24} sm={6}>
          <Sidebar>
            <FilterSection>
              <FilterTitle level={5}>Hình thức học tập</FilterTitle>
              <Checkbox.Group>
                <Row>
                  <Col span={24}>
                    <Checkbox value="online">
                      <FaChalkboardTeacher style={{ marginRight: 8 }} />
                      Online
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="offline">
                      <FaHome style={{ marginRight: 8 }} />
                      Tại nhà
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </FilterSection>
            <FilterSection>
              <FilterTitle level={5}>Thời gian học tập</FilterTitle>
              <DayContainer>
                <DayButton>2</DayButton>
                <DayButton>3</DayButton>
                <DayButton>4</DayButton>
                <DayButton>5</DayButton>
                <DayButton>6</DayButton>
                <DayButton>7</DayButton>
                <DayButton>CN</DayButton>
              </DayContainer>
              <DayContainer>
                <TimeSlotButton>6:00-9:00</TimeSlotButton>
                <TimeSlotButton>9:00-12:00</TimeSlotButton>
                <TimeSlotButton>12:00-15:00</TimeSlotButton>
                <TimeSlotButton>15:00-18:00</TimeSlotButton>
                <TimeSlotButton>18:00-21:00</TimeSlotButton>
                <TimeSlotButton>21:00-24:00</TimeSlotButton>
              </DayContainer>
            </FilterSection>
            <FilterSection>
              <FilterTitle level={5}>Giá cả (VNĐ)</FilterTitle>
              <Slider
                range
                min={0}
                max={10000000}
                defaultValue={[0, 5000000]}
                tipFormatter={value => `${value} VNĐ`}
              />
            </FilterSection>
            <FilterSection>
              <FilterTitle level={5}>Mức độ học tập</FilterTitle>
              <Checkbox.Group>
                <Checkbox value="basic">Cơ bản</Checkbox>
                <Checkbox value="intermediate">Trung cấp</Checkbox>
                <Checkbox value="advanced">Nâng cao</Checkbox>
              </Checkbox.Group>
            </FilterSection>
          </Sidebar>
        </Col>
        <Col className="mt-60" xs={24} sm={18}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3}>Những giảng viên tốt nhất</Title>
            </Col>
            <Col>
              <Select defaultValue="low-to-high" style={{ width: 150 }}>
                <Option value="low-to-high">Giá thấp nhất</Option>
                <Option value="high-to-low">Giá cao nhất</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {data.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8}>
                <StyledCard
                  cover={<img alt={item.title} src={item.imageUrl} />}
                >
                  <Title level={5}>{item.title}</Title>
                  <Paragraph>{item.description}</Paragraph>
                  <Avatar icon={<UserOutlined />} />
                  <Text>{item.author}</Text>
                  <Text>{item.authorTitle}</Text>
                </StyledCard>
              </Col>
            ))}
          </Row>
          <div className="mt-20 center-text">
            <Button type="primary" >Xem thêm Giảng Viên</Button>

          </div>
        </Col>
      </Row>
    </MentorForSubjectContainer>
  );
}

export default MentorForSubject;