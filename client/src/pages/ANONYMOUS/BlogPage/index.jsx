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



const BlogPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [listBlog, setListBlog] = useState([])
  const [pagination, setPagination] = useState({

  })

  const content = (
    <div>
      <p>Lưu</p>
      <p>Chỉnh sửa</p>
    </div>
  )


  const getListSubjectCate = async () => {
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
    getListSubjectCate()
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
              extra={
                <Popover content={content} trigger="focus">
                  <ButtonCircle
                    icon={ListIcons?.ICON_ELLIP}
                  />
                </Popover>

              }
            >
              <CardImage src={blog?.AvatarPath} />
              <CardContent>
                <CardDescription>
                  {blog?.description}
                </CardDescription>
                <StyledButton type="primary" onClick={() => navigate(`/blog/${blog?._id}`)}>Đọc thêm</StyledButton>
              </CardContent>
            </Card>
          </>
        ))
        }
      </Container >
    </SpinCustom >
  )
}

export default BlogPage