import { Collapse, Empty } from "antd"
import { useSelector } from "react-redux"
import { getListComboKey } from "src/lib/commonFunction"
import { SYSTEM_KEY } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"

const Quotes = ({ user }) => {

  const { subjects, listSystemKey } = useSelector(globalSelector)
  console.log(subjects);
  const parentKeyLevel = getListComboKey(SYSTEM_KEY.SKILL_LEVEL, listSystemKey)

  const items = !!user?.Quotes?.length
    ? user?.Quotes?.map((i, idx) => (
      {
        key: idx,
        label: subjects?.find(item => item?._id === i?.SubjectID)?.SubjectName,
        children: (
          <>
            <div>Tiêu đề: {i?.Title}</div>
            <div>Mô tả: {i?.Content}</div>
            <div>Trình độ:
              {
                parentKeyLevel?.map(item => {
                  if (i?.Levels?.includes(item?.ParentID))
                    return ` ${item?.ParentName} `
                })
              }
            </div>
          </>
        )
      }
    ))
    : []

  return (
    <div className="p-12">
      <div className='fw-600 fs-16 mb-12'>
        Môn học {user?.FullName} giảng dạy
      </div>
      {
        !!items?.length
          ? <Collapse items={items} />
          : <Empty description={`${user?.FullName} chưa điền thông tin này`} />
      }
    </div >
  )
}

export default Quotes