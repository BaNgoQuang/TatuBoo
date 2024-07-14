import { Col, Row, Select, Space, Tag } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import InputCustom from "src/components/InputCustom"
import ListIcons from "src/components/ListIcons"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import { getListComboKey } from "src/lib/commonFunction"
import { SYSTEM_KEY } from "src/lib/constant"
import { formatMoney } from "src/lib/stringUtils"
import { globalSelector } from "src/redux/selector"
import BankingService from "src/services/BankingService"
import PaymentService from "src/services/PaymentService"
import ModalViewReport from "./components/ModalViewReport"
import ModalPaymentTransfer from "./components/ModalPaymentTransfer"
import dayjs from "dayjs"


const PaymentTransfer = () => {

  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [listBank, setListBank] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 10,
  })
  const [openModalViewReport, setOpenModalViewReport] = useState(false)
  const [openModalPaymentTransfer, setOpenModalTransfer] = useState(false)
  const { listSystemKey } = useSelector(globalSelector)
  const PaymentStatuskey = getListComboKey(SYSTEM_KEY.PAYMENT_STATUS, listSystemKey)


  const getListPaymentTransfer = async () => {
    try {
      setLoading(true)
      const res = await PaymentService.getListTransfer(pagination)
      if (res?.isError) return toast.error(res?.msg)
      setListData(res?.data)
      // setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  const getListBank = async () => {
    try {
      setLoading(true)
      const res = await BankingService.getListBank()
      if (!res?.data?.data) return toast.error(res?.data?.desc)
      setListBank(res?.data?.data)
    } finally {
      setLoading(false)
    }
  }

  const handleSendRequestExplanation = async (record) => {
    try {
      setLoading(true)
      const res = await PaymentService.sendRequestExplanation({
        PaymentID: record?._id,
        Email: record?.Receiver?.Email,
        FullName: record?.Receiver?.FullName,
        Reports: record?.Receiver?.Reports?.map(i => ({
          DateAt: dayjs(open?.TimeTables?.find(item => item?._id === i?.Timetable)?.DateAt).format("DD/MM/YYYY"),
          Time: `${dayjs(open?.TimeTables?.find(item => item?._id === i?.Timetable)?.StartTime).format("HH:mm")} - ${dayjs(open?.TimeTables?.find(item => item?._id === i?.Timetable)?.EndTime).format("HH:mm")}`,
          Title: i?.Title,
          Content: i?.Content
        }))
      })
      if (!!res?.isError) return
      toast.success(res?.msg)
    } finally {
      setLoading(false)
    }
  }

  const getBankingInforOfUser = async (record) => {
    try {
      setLoading(true)
      const res = await BankingService.getBankingInforOfUser({
        UserID: record?.Receiver?._id,
        FullName: record?.Receiver?.FullName
      })
      if (!!res?.isError) return toast.error(res?.msg)
      setOpenModalTransfer({
        ...res?.data,
        FullName: record?.Receiver?.FullName,
        Email: record?.Receiver?.Email,
        PaymentID: record?._id,
        BankName: listBank?.find(i => +i?.bin === res?.data?.BankID)?.name,
        BankImgae: listBank?.find(i => +i?.bin === res?.data?.BankID)?.logo,
        TotalFee: record?.TotalFee,
        Description: record?.Description,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListBank()
  }, [])

  useEffect(() => {
    if (pagination.PageSize) getListPaymentTransfer()
  }, [pagination])

  const listBtn = record => [
    {
      title: "Xem chi tiết báo cáo",
      disabled: !record?.Receiver?.Reports?.length,
      icon: ListIcons?.ICON_VIEW,
      onClick: () => setOpenModalViewReport({ ...record?.Receiver, RequestAxplanationAt: record?.RequestAxplanationAt })
    },
    {
      title: "Thanh toán",
      disabled: !!record?.Receiver?.Reports?.length,
      icon: ListIcons?.ICON_CONFIRM,
      onClick: () => getBankingInforOfUser(record)
    },
    {
      title: "Gửi yêu cầu giải trình",
      icon: ListIcons?.ICON_CLOSE,
      disabled: !record?.Receiver?.Reports?.length || !!record?.RequestAxplanationAt,
      onClick: () => handleSendRequestExplanation(record)
    }
  ]

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
      render: (_, record) => (
        <div>{record?.Receiver?.FullName}</div>
      )
    },
    {
      title: 'Số tiền cần thanh toán',
      width: 70,
      align: 'center',
      render: (text, record) => (
        <div>{formatMoney(record.TotalFee)}</div>
      ),
    },
    {
      title: 'Số lượng tiết học trong tuần',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <div>{record?.Receiver?.TimeTables?.length}</div>
      )
    },
    {
      title: "Số tiết học bị báo cáo",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div>{record?.Receiver?.Reports?.length}</div>
      )
    },
    {
      title: "Trạng thái",
      width: 80,
      dataIndex: "PaymentStatus",
      align: "center",
      key: "PaymentStatus",
      render: (val, record) => (
        <Tag color={["warning", "success", "error"][val - 1]} className="p-5 fs-16">
          {
            PaymentStatuskey?.find(i => i?.ParentID === val)?.ParentName
          }
        </Tag>
      )
    },
    {
      title: "Chức năng",
      width: 70,
      render: (_, record) => (
        <Space direction="horizontal">
          {
            listBtn(record)?.map((i, idx) =>
              <ButtonCircle
                key={idx}
                disabled={i?.disabled}
                title={i?.title}
                icon={i?.icon}
                onClick={i?.onClick}
              />
            )
          }
        </Space>
      )
    }
  ]

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24} className="mb-5">
          <div className="title-type-1">
            QUẢN LÝ CHUYỂN KHOẢN
          </div>
        </Col>
        <Col span={20}>
          <InputCustom
            type="isSearch"
            placeholder="Tìm kiếm mã giao dịch..."
            onSearch={e => setPagination(pre => ({ ...pre, TraddingCode: e }))}
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Trạng thái thanh toán"
            onChange={e => setPagination(pre => ({ ...pre, Paymentstatus: e }))}
          >
            {PaymentStatuskey.map(PaymentStatus => (
              <Select.Option key={PaymentStatus._id} value={PaymentStatus.ParentID}>
                {PaymentStatus?.ParentName}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={24} className="mt-16">
          <TableCustom
            isPrimary
            bordered
            noMrb
            dataSource={listData}
            columns={columns}
            editableCell
            sticky={{ offsetHeader: -12 }}
            textEmpty="Không có dữ liệu"
            rowKey="key"
          />
        </Col>

        {
          !!openModalViewReport &&
          <ModalViewReport
            open={openModalViewReport}
            onCancel={() => setOpenModalViewReport(false)}
            handleSendRequestExplanation={handleSendRequestExplanation}
          />
        }

        {
          !!openModalPaymentTransfer &&
          <ModalPaymentTransfer
            open={openModalPaymentTransfer}
            onCancel={() => setOpenModalTransfer(false)}
            setLoading={setLoading}
            onOk={() => getListPaymentTransfer()}
          />
        }

      </Row>
    </SpinCustom>
  )
}

export default PaymentTransfer