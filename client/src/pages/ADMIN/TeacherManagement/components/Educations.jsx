import { Collapse, Empty } from "antd"

const Educations = ({ user }) => {

  const items = !!user?.Educations?.length
    ? user?.Educations?.map((i, idx) => (
      {
        key: idx,
        label: i?.Title,
        children: (
          <>
            <div>Chi tiết: {i?.Content}</div>
            <div>Bắt đầu từ: {i?.StartDate}</div>
            <div>Đến: {i?.EndDate}</div>
          </>
        )
      }
    ))
    : []

  return (
    <div className="p-12">
      <div className='fw-600 fs-16 mb-12'>
        Học vấn của {user?.FullName}
      </div>
      {
        !!items?.length
          ? <Collapse items={items} />
          : <Empty description={`${user?.FullName} chưa điền thông tin này`} />
      }
    </div>
  )
}

export default Educations