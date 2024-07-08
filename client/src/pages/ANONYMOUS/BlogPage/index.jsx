import { Card } from "antd"
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

const BlogPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [listBlog, setListBlog] = useState([])
  const [pagination, setPagination] = useState({

  })


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
    if (pagination?.PageSize) getListSubjectCate()
  }, [pagination])

  return (
    <Container>
      <Title>TatuBoo Blog</Title>
      <Description>
        Tại đây, bạn sẽ tìm thấy nhiều tài nguyên hữu ích để tham khảo khi học điều gì đó mới - từ hướng dẫn toàn diện đến hướng dẫn từng bước.
      </Description>
      {listBlog.map((blog) => (
        <>
          <Card>
            <CardImage src={blog?.AvatarPath} alt="Music, Piano" />
            <CardContent>
              <CardDescription>
                {blog?.description}
              </CardDescription>
              <StyledButton type="primary" onClick={() => navigate(`/blog/${blog?._id}`)}>Đọc thêm</StyledButton>
            </CardContent>
          </Card>
        </>
      ))}
    </Container>
  )
}

export default BlogPage