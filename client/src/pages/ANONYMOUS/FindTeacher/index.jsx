import { Button, Col, Row, Typography } from "antd"
import { FindTeacherContainer } from "./styled"
import InputCustom from "src/components/InputCustom";
import ListSubject from "./components/ListSubject";
import PrivateLearning from "../HomePage/components/PrivateLearning/PrivateLearning";

const { Title } = Typography

const FindTeacher = () => {
  return (
    <FindTeacherContainer>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={1} className="fw-700 center-text mb-20" style={{ maxWidth: '500px', margin: '0 auto' }}>
            Tìm kiếm giảng viên tốt nhất với giá cả phải chăng
          </Title>
        </Col>
        <Col span={24} >
          <InputCustom
            type="isSearch"
          />
          <div className="d-flex mt-20 g-10">
            <p className=" blue-text fs-20">Môn học phổ biến: </p>
            <Button>Piano</Button>
            <Button>Violin</Button>
            <Button>Guitar</Button>
          </div>
        </Col>
        <Col span={24} className="mt-60">
          <ListSubject />
        </Col>
        {/* Lớp học riêng tư với những giảng viên tốt nhất */}
        <Col span={24} className="mt-60">
          <PrivateLearning />
        </Col>
      </Row>
    </FindTeacherContainer>
  );
}

export default FindTeacher;