import { Card } from 'antd'

const { Meta } = Card

const CardItem = ({ title, description, image }) => {
  return (
    <Card
      hoverable
      cover={<img alt={title} src={image} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default CardItem;
