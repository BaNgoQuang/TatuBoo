import { Button, Card, Dropdown, Popover } from "antd"
import {
  CardContent,
  CardDescription,
  CardImage,
  Container,
  Description,
  StyledButton,
  Title
} from "./styled"
import { useEffect, useState } from "react"
import BlogService from "src/services/BlogService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import SpinCustom from "src/components/SpinCustom"
import ListIcons from "src/components/ListIcons"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import InsertUpdateBlog from "src/pages/USER/BlogPosting/components/InsertUpdateBlog"



const BlogPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [modalBlog, setModalBlog] = useState(false)
  const [listBlog, setListBlog] = useState([])
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 10
  })

  const { user } = useSelector(globalSelector)

  const getListBlog = async () => {
    try {
      setLoading(true)
      const res = await BlogService.getListBlog(pagination)
      if (res?.isError) return toast.error(res?.msg)
      setListBlog(res?.data?.List)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getListBlog()
  }, [pagination])

  return (
    <SpinCustom spinning={loading}>
      <Container>
        <Title>TatuBoo Blog</Title>
        <Description>
          Tại đây, bạn sẽ tìm thấy nhiều tài nguyên hữu ích để tham khảo khi học điều gì đó mới - từ hướng dẫn toàn diện đến hướng dẫn từng bước.
        </Description>
        {listBlog.map((blog) => (
          <>
            <Card
              className="mt-20"
              hoverable
              title={blog?.Title}
              extra={!!(user?._id === blog?.Teacher) ?
                < ButtonCircle
                  title="Chỉnh sửa"
                  icon={ListIcons?.ICON_EDIT}
                  onClick={() => setModalBlog(blog)}
                />
                : ""
              }
            >
              <CardImage src={blog?.AvatarPath} />
              <CardContent>
                <CardDescription>
                  {blog?.Description}
                </CardDescription>
                <StyledButton
                  type="primary"
                // onClick={() => navigate(`/blog/${blog?._id}`)}
                >
                  Đọc thêm
                </StyledButton>
              </CardContent>
            </Card >
          </>
        ))
        }
      </Container >
      {!!modalBlog && (
        <InsertUpdateBlog
          open={modalBlog}
          onCancel={() => setModalBlog(false)}
          onOk={() => getListBlog()}
        />
      )}
    </SpinCustom >
  )
}

export default BlogPage