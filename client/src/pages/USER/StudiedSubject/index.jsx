import { Col, Row, Select } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import TableCustom from "src/components/TableCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { SYSTEM_KEY } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"
import LearnHistoryService from "src/services/LearnHistoryService"

const StudiedSubject = () => {
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 10,
  })

  const { listSystemKey } = useSelector(globalSelector)
  const FeeTypeKey = getListComboKey(SYSTEM_KEY.FEE_TYPE, listSystemKey)

  const GetListLearnHistory = async () => {
    try {
      setLoading(true)
      const res = await LearnHistoryService.getListLearnHistory(pagination)
      if (res?.isError) return toast.error(res?.msg)
      setListData(res?.data)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (pagination.PageSize) GetListLearnHistory()
  }, [pagination])



  const columns = [
    {
      title: 'STT',
      width: 35,
      align: 'center',
      dataIndex: '_id',
      key: '_id',
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: 'Tên môn học',
      width: 70,
      align: 'center',
      dataIndex: 'SubjectName',
      key: 'SubjectName',
      render: (text, record) => (
        <div>{record?.Subject?.SubjectName}</div>
      ),
    },
    {
      title: 'Số lượng buổi học',
      width: 50,
      align: 'center',
      dataIndex: 'LearnNumber',
      key: 'LearnNumber',
    },
    {
      title: 'Giáo viên phụ trách',
      width: 80,
      align: 'center',
      dataIndex: 'Teacher',
      key: 'Teacher',
      render: (text, record) => (
        <div>{record?.Teacher?.FullName}</div>
      ),
    },
    {
      title: 'Ngày đăng ký',
      width: 80,
      align: 'center',
      dataIndex: 'Teacher',
      key: 'Teacher',
      render: (text, record) => (
        <div>{moment(record?.RegisterDate).format('DD/MM/YYYY')}</div>
      ),
    },
    {
      title: "Trạng thái",
      width: 80,
      dataIndex: "FeeType",
      align: "center",
      key: "FeeType",
      render: (text, record) => (
        <p>
          {FeeTypeKey.find(i => i?.ParentID === record?.FeeType)?.ParentName}
        </p>
      )
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} className="mb-5">
        <div className="title-type-1">
          DANH SÁCH CÁC MÔN ĐÃ THAM GIA
        </div>
      </Col>
      <Col span={18}>
        <InputCustom
          type="isSearch"
          placeholder="Tìm kiếm môn học..."
          onSearch={e => setPagination(pre => ({ ...pre, TraddingCode: e }))}
        />
      </Col>
      <Col span={6}>
        <Select
          placeholder="Trạng thái"
          onChange={e => setPagination(pre => ({ ...pre, Paymentstatus: e }))}
        >
          {FeeTypeKey.map(FeeType => (
            <Select.Option key={FeeType._id} value={FeeType.ParentID}>
              {FeeType?.ParentName}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={24} className="mt-16">
        <TableCustom
          isPrimary
          bordered
          noMrb
          showPagination
          loading={loading}
          dataSource={listData}
          columns={columns}
          editableCell
          sticky={{ offsetHeader: -12 }}
          textEmpty="Không có dữ liệu"
          rowKey="key"
          pagination={
            !!pagination?.PageSize
              ? {
                hideOnSinglePage: total <= 10,
                current: pagination?.CurrentPage,
                pageSize: pagination?.PageSize,
                responsive: true,
                total,
                showSizeChanger: total > 10,
                locale: { items_per_page: "" },
                onChange: (CurrentPage, PageSize) =>
                  setPagination(pre => ({
                    ...pre,
                    CurrentPage,
                    PageSize,
                  })),
              }
              : false
          }
        />
      </Col>
    </Row>
  )
}

export default StudiedSubject
