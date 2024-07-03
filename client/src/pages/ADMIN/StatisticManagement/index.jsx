import { Col, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import CountUp from "react-countup"
import { toast } from "react-toastify"
import SpinCustom from "src/components/SpinCustom"
import Statistics from "src/services/StatisticService"

const formatter = (value) => <CountUp end={value} separator="," />


const StatisticManagement = () => {
  const [loading, setLoading] = useState(false)
  const [newRegister, setNewRegister] = useState(0)


  const StatisticNewRegisteredUser = async () => {
    try {
      setLoading(true)
      const res = await Statistics.statisticNewRegisteredUser("Month")
      if (res?.isError) return toast.error(res?.msg)
      setNewRegister(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    StatisticNewRegisteredUser()
  }, [])

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Statistic title="Số lượng người đăng ký tài khoản mới" value={newRegister} formatter={formatter} />
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default StatisticManagement