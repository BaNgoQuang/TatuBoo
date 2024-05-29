import { Collapse, Empty } from "antd"

const ExperiencesOrEducations = ({ user, isExperience }) => {

  const items = !!user[!!isExperience ? "Experiences" : "Educations"]?.length
    ? user?.Experiences?.map((i, idx) => (
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
        {!!isExperience ? "Experiences" : "Educations"} của {user?.FullName}
      </div>
      {
        !!items?.length
          ? <Collapse items={items} />
          : <Empty description={`${user?.FullName} chưa điền thông tin này`} />
      }
    </div>
  )
}

export default ExperiencesOrEducations