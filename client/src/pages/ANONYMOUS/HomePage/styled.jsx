import { Card } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  /* text-align: center; */
    width: 80%;
  margin: auto;
  padding: 50px 20px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 16px;
`;

export const Description = styled.p`
  font-size: 16px;
  margin-bottom: 32px;
`;

export const StyledLink = styled(Link)`
font-size: 16px;
`

export const LearningMethodsContainer = styled.div`
  padding: 50px 20px;
  text-align: center;

  .ant-card {
    border-radius: 15px;
  }

  .ant-card-cover {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: hidden;
  }

  .ant-card-meta-title {
    font-weight: bold;
  }
`;

export const ProfileCard = styled(Card)`
  .ant-card-head {
    background-color: pink; /* Adjust the color gradient as needed */
  }
  .ant-card-body {
    /* Your styles here */
  }
`;