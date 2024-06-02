import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import UserService from "src/services/UserService"

const BookingPage = () => {

  const { TeacherID, SubjectID } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [teacher, setTeacher] = useState()
  const [quote, setQuote] = useState()
  const [reviews, setReviews] = useState([])

  const getDetailTeacher = async () => {
    try {
      setLoading(true)
      const res = await UserService.getDetailTeacher({ TeacherID, SubjectID })
      if (res?.isError) return navigate("/not-found")
      setTeacher(res?.data)
      setQuote(
        res?.data?.Quotes?.find(i => i?.SubjectID === SubjectID)
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetailTeacher()
  }, [TeacherID, SubjectID])

  return (
    <div>
      BookingPage
    </div>
  )
}

export default BookingPage