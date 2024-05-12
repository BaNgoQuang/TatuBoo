import moment from 'moment'

export const getRegexEmail = () => {
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  return re
}

export const getRegexPassowrd = () => {
  const re = /^[A-Z][a-zA-Z0-9]{5,}$/
  return re
}

export function getRegexNumber() {
  const re = /^[0-9]+$/
  return re
}

export const getRegexDOB = (dateString) => {
  return moment(dateString, 'DD/MM/YYYY', true).isValid()
}

export const formatNumberToK = (number) => {
  const formattedAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(+number)

  return formattedAmount
}

export const formatNumber = (number) => {
  var formattedNumber = number.toLocaleString('en-US').replace(/,/g, '.')
  return formattedNumber
}

