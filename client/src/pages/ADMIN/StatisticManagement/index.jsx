import { Card, Col, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import CountUp from "react-countup"
import { toast } from "react-toastify"
import SpinCustom from "src/components/SpinCustom"
import Statistics from "src/services/StatisticService"
import styled from "styled-components"
import LineRace from "./components/LineRace"

const formatter = (value) => <CountUp end={value} separator="," />

// Styled components
const StatisticCardWrapper = styled(Card)`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;


const StatisticManagement = () => {
  const [loading, setLoading] = useState(false)
  const [newRegister, setNewRegister] = useState(0)


  const StatisticNewRegisteredUser = async () => {
    try {
      setLoading(true)
      const res = await Statistics.statisticNewRegisteredUser('Month')
      if (res?.isError) return toast.error(res?.msg)
      setNewRegister(res?.data)
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
        <Col span={8}>
          <StatisticCardWrapper>
            <Statistic title="Số lượng người đăng ký tài khoản mới" value={newRegister?.Total} formatter={formatter} />
          </StatisticCardWrapper>
        </Col>
        <Col span={8}>
          <StatisticCardWrapper>
            <Statistic title="Số lượng Học sinh đăng ký tài khoản mới" value={newRegister?.TotalStudent} formatter={formatter} />
          </StatisticCardWrapper>
        </Col>
        <Col span={8}>
          <StatisticCardWrapper>
            <Statistic title="Số lượng Giáo viên đăng ký tài khoản mới" value={newRegister?.TotalTeacher} formatter={formatter} />
          </StatisticCardWrapper>
        </Col>
        <Col span={24}>
          <LineRace />
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default StatisticManagement