import { Col, Row } from 'antd'
import CardItem from './CardItem'

const cardData = [
  { title: 'Âm nhạc', description: '25 Articles', image: 'path_to_image' },
  { title: 'Ngoại ngữ', description: '25 Articles', image: 'path_to_image' },
  { title: 'Học thuật', description: '25 Articles', image: 'path_to_image' },
  { title: 'Biểu diễn', description: '25 Articles', image: 'path_to_image' }
];

const CardList = () => {
  return (
    <Row gutter={[16, 16]}>
      {cardData.map((item, index) => (
        <Col key={index} xs={24} sm={12} md={6}>
          <CardItem {...item} />
        </Col>
      ))}
    </Row>
  );
};

export default CardList;
