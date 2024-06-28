import { Col, Row, Select } from "antd"
import { saveAs } from "file-saver"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import TableCustom from "src/components/TableCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { SYSTEM_KEY } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"
import PaymentService from "src/services/PaymentService"

const PaymentManagement = () => {
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    TraddingCode: "",
    CurrentPage: 1,
    PageSize: 10,
    Paymentstatus: 0
  })

  const { listSystemKey } = useSelector(globalSelector)
  const FeeTypeKey = getListComboKey(SYSTEM_KEY.Payment_Type, listSystemKey)
  const PaymentStatuskey = getListComboKey(SYSTEM_KEY.PAYMENT_STATUS, listSystemKey)

  const getListPayment = async () => {
    try {
      setLoading(true)
      const res = await PaymentService.getListPayment(pagination)
      if (res?.isError) return toast.error(res?.msg)
      setListData(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (pagination.PageSize) getListPayment()
  }, [pagination])

  const exportExcel = async () => {
    try {
      setLoading(true)
      const res = await PaymentService.exportExcel()
      if (res?.isError) return toast.error(res?.msg)
      saveAs(res, "payment.xlsx")
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'Mã giao dịch',
      width: 60,
      align: 'center',
      dataIndex: 'TraddingCode',
      key: 'TraddingCode',
    },
    {
      title: 'Người giao dịch',
      width: 100,
      align: 'center',
      dataIndex: 'SenderName',
      key: 'SenderName',
    },
    {
      title: 'Nội dung giao dịch',
      width: 300,
      align: 'center',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Số tiền giao dịch',
      width: 80,
      align: 'center',
      dataIndex: 'TotalFee',
      key: 'TotalFee',
      render: (text, record) => (
        <div>{record.TotalFee}.000</div>
      ),
    },
    {
      title: "Loại thanh toán",
      width: 100,
      dataIndex: "FeeType",
      align: "center",
      key: "FeeType",
      render: (text, record) => (
        <p>
          {FeeTypeKey.find(i => i?.ParentID === record?.FeeType)?.ParentName}
        </p>
      )
    },
    {
      title: "Trạng thái thanh toán",
      width: 100,
      dataIndex: "PaymentStatus",
      align: "center",
      key: "PaymentStatus",
      render: (val, record) => (
        <div style={{ color: ["#fa8c16", "rgb(29, 185, 84)", "red"][val - 1] }} className="fw-600">
          {
            PaymentStatuskey?.find(i => i?.ParentID === val)?.ParentName
          }
        </div >
      )
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} className="mb-5">
        <div className="d-flex-sb">
          <div className="title-type-1">
            QUẢN LÝ THANH TOÁN
          </div>
          <div>
            <ButtonCustom
              loading={loading}
              className="third-type-2"
              onClick={() => exportExcel()}
            >
              Xuất excel
            </ButtonCustom>
          </div>
        </div>
      </Col>
      <Col span={18}>
        <InputCustom
          type="isSearch"
          placeholder="Tìm kiếm mã giao dịch..."
          onSearch={e => setPagination(pre => ({ ...pre, TraddingCode: e }))}
        />
      </Col>
      <Col span={6}>
        <Select
          placeholder="Loại thanh toán"
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

export default PaymentManagement