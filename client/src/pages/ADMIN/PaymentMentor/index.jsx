import { Col, Row, Select } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import TableCustom from "src/components/TableCustom"
import BankingService from "src/services/BankingService"

const PaymentMentor = () => {
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [listBank, setListBank] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 10,
  })


  const GetListPaymentInCurrentWeek = async () => {
    try {
      setLoading(true)
      const res = await BankingService.getListPaymentInCurrentWeek(pagination)
      if (res?.isError) return toast.error(res?.msg)
      setListData(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  const GetListBank = async () => {
    try {
      setLoading(true)
      const res = await BankingService.getListBank()
      if (!res?.data?.data) return toast.error(res?.data?.desc)
      setListBank(res?.data?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetListBank()
    if (pagination.PageSize) GetListPaymentInCurrentWeek()
  }, [pagination])

  const columns = [
    {
      title: "STT",
      width: 35,
      align: "center",
      render: (_, record, index) => (
        <div className="text-center">{pagination?.PageSize * (pagination?.CurrentPage - 1) + index + 1}</div>
      ),
    },
    {
      title: 'Tên giáo viên',
      width: 80,
      align: 'center',
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: 'Số tiền cần thanh toán',
      width: 70,
      align: 'center',
      dataIndex: 'salary',
      key: 'salary',
      render: (text, record) => (
        <div>{record.salary}.000</div>
      ),
    },
    {
      title: 'Số lượng tiết học trong tuần',
      width: 50,
      align: 'center',
      dataIndex: 'teachingSessions',
      key: 'teachingSessions',
    },
    {
      title: "Thông tin thanh toán",
      width: 100,
      align: "center",
      dataIndex: "teacherBankingInfor",
      key: "teacherBankingInfor",
      render: (text, record) => (
        record.teacherBankingInfor &&
        <div>
          {listBank.find(bank => bank.id === record.teacherBankingInfor?.BankID)?.shortName} - {record?.teacherBankingInfor?.UserBankAccount}
        </div>
      )
    },
    {
      title: "Tên chủ tài khoản",
      width: 80,
      dataIndex: "UserBankName",
      align: "center",
      key: "UserBankName",
      render: (val, record) => (
        <div>
          {record.teacherBankingInfor?.UserBankName}
        </div>
      )
    },
    {
      title: "Trạng thái",
      width: 100,
      dataIndex: "PaymentType",
      align: "center",
      key: "PaymentType",
      render: (val, record) => (
        <div style={{ color: ["#fa8c16", "rgb(29, 185, 84)", "red"][val - 1] }} className="fw-600">
          {
            // PaymentStatuskey?.find(i => i?.ParentID === val)?.ParentName
          }
        </div >
      )
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} className="mb-5">
        <div className="title-type-1">
          QUẢN LÝ THANH TOÁN CHO GIÁO VIÊN
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
          {/* {PaymentTypeKey.map(PaymentType => (
            <Select.Option key={PaymentType._id} value={PaymentType.ParentID}>
              {PaymentType?.ParentName}
            </Select.Option>
          ))} */}
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
  );
}

export default PaymentMentor;