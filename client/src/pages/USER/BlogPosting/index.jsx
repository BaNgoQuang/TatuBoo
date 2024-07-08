import { Col, Row, Select } from "antd"
import { useEffect, useState } from "react"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import TableCustom from "src/components/TableCustom"
import InsertUpdateBlog from "./components/InsertUpdateBlog"
import BlogService from "src/services/BlogService"
import { toast } from "react-toastify"


const BlogPosting = () => {
  const [loading, setLoading] = useState(false)
  const [modalBlog, setModalBlog] = useState(false)
  const [listData, setListData] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 10,
  })


  const GetListBlog = async () => {
    try {
      setLoading(true)
      const res = await BlogService.getListBlog(pagination)
      if (res?.isError) return toast.error(res?.msg)
      setListData(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (pagination.PageSize) GetListBlog()
  }, [pagination])



  const columns = [
    {
      title: 'Tiêu đề bài viết',
      width: 100,
      align: 'center',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Mô tả bài viết',
      width: 300,
      align: 'center',
      dataIndex: 'Description',
      key: 'Description',
      render: (_, record, index) => (
        <></>
        // <span dangerouslySetInnerHTML={{ __html: record?.Contents }} />
        // <img src={record?.AvatarPath} style={{ width: '100px', height: '100px' }} />
      ),
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} className="d-flex-sb">
        <div className="title-type-1">
          DANH SÁCH BÀI VIẾT
        </div>
        <ButtonCustom
          className="third-type-2"
          onClick={() => setModalBlog(true)}
        >
          Thêm mới
        </ButtonCustom>
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
      {!!modalBlog && (
        <InsertUpdateBlog
          open={modalBlog}
          onCancel={() => setModalBlog(false)}
          onOk={() => GetListBlog()}
        />
      )}
    </Row>
  )
}

export default BlogPosting;