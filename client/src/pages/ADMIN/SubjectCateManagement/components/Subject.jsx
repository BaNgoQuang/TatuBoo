import { Col, Form, Row, Space } from "antd"
import { useEffect, useState } from "react"
import ListIcons from "src/components/ListIcons"
import CB1 from "src/components/Modal/CB1"
import CustomModal from "src/components/Modal/CustomModal"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import CustomButton from "src/components/MyButton/ButtonCustom"
import SpinCustom from "src/components/SpinCustom"
import TableCustom from "src/components/TableCustom"
import SubjectService from "src/services/SubjectService"


const ModalSubject = ({ open, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    TextSearch: "",
    SubjectCateID: open?._id,
    CurrentPage: 1,
    PageSize: 10,
  })

  const getListSubject = async () => {
    try {
      setLoading(true)
      const res = await SubjectService.getListSubject(pagination)
      if (res?.isError) return
      setListData(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (pagination.PageSize) getListSubject()
  }, [pagination])


  const columns = [
    {
      title: "STT",
      width: 50,
      align: "center",
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Tên môn học",
      width: 100,
      dataIndex: "SubjectName",
      key: "SubjectName",
    },
    {
      title: "Ảnh minh hoạ",
      width: 100,
      align: "center",
      render: (_, record, index) => (
        <img src={listData?.AvatarPath} />
      ),
    },
    {
      title: "Mô tả",
      width: 400,
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Chức năng",
      width: 70,
      key: "Function",
      align: "center",
      render: (_, record) => (
        <Space direction="horizontal">
          <ButtonCircle
            title="Chỉnh sửa"
            icon={ListIcons?.ICON_EDIT}
          // onClick={() => setOpenModalSubjectCate(record)}
          />
          <ButtonCircle
            title="Xóa"
            icon={ListIcons?.ICON_DELETE}
            onClick={() => {
              CB1({
                title: `Bạn có chắc chắn muốn xoá danh mục "${record?.SubjectName}" không?`,
                // icon: "trashRed",
                okText: "Đồng ý",
                cancelText: "Đóng",
                onOk: async close => {
                  // onDelete(record?.SubjectCateID)
                  getListSubject()
                  close()
                },
              })
            }}
          />
        </Space>
      ),
    },
  ]

  useEffect(() => {
    if (!!open?._id) {
      form.setFieldsValue({
        ...open,
      })
    }
  }, [open])

  return (
    <CustomModal
      title="Danh sách môn học"
      width={1300}
      open={open}
      onCancel={onCancel}
    >
      <SpinCustom spinning={loading}>
        <Row>
          <Col span={24} className="d-flex-sb">
            <div className="title-type-5">
              QUẢN LÝ MÔN HỌC THUỘC DANH MỤC {open?.SubjectCateName.toUpperCase()}
            </div>
            <CustomButton
              btnType="add"
            // onClick={() => setOpenModalSubjectCate(true)}
            >
              Thêm mới
            </CustomButton>
          </Col>
          <Col span={24} className="mt-30">
            <TableCustom
              isPrimary
              bordered
              noMrb
              showPagination
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
                      setPagination({
                        ...pagination,
                        CurrentPage,
                        PageSize,
                      }),
                  }
                  : false
              }
            />
          </Col>
          {/* {!!openModalSubjectCate && (
            <ModalSubjectCate
              open={openModalSubjectCate}
              onCancel={() => setOpenModalSubjectCate(false)}
              onOk={() => getListSubjectCate()}
            />
          )} */}

        </Row>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalSubject
