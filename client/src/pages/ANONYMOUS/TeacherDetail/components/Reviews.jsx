import { Empty } from "antd"

const Reviews = ({ reviews }) => {
  return (
    <div>
      <div className="fs-20 fw-600 mb-8">Đánh giá</div>
      <div>
        {
          !!reviews?.lengh ?
            <div>basdbsdb</div>
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Giáo viên chưa có đánh giá nào" />
        }
      </div>
    </div>
  )
}

export default Reviews