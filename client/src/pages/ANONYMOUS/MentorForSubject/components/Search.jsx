import { Button, Col } from "antd"
import InputCustom from "src/components/InputCustom"

const Search = () => {
  return (
    <>
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
    </>
  )
}

export default Search