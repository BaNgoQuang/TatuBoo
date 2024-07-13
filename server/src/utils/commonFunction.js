import CryptoJS from "crypto-js"
import * as dotenv from "dotenv"
dotenv.config()

export const getRegexEmail = () => {
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  return regex
}

export const getRegexPassword = () => {
  const regex = /^[A-Z][a-zA-Z0-9]{5,}$/
  return regex
}

export const getRegexObjectID = () => {
  const regex = /^[0-9a-fA-F]{24}$/
  return regex
}

export const randomNumber = () => {
  const min = 100000
  const max = 999999
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export const encodeData = object => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(object),
    process.env.HASH_KEY,
  ).toString()
}

export const decodeData = data_hashed => {
  const decryptedBytes = CryptoJS.AES.decrypt(
    data_hashed,
    process.env.HASH_KEY,
  )
  return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))
}

export const randomPassword = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const getCurrentWeekRange = () => {
  const currentDate = new Date()
  const dayOfWeek = currentDate.getDay()
  const startOfWeek = new Date(currentDate)
  const endOfWeek = new Date(currentDate)

  startOfWeek.setDate(currentDate.getDate() - dayOfWeek)
  startOfWeek.setHours(0, 0, 0, 0)

  endOfWeek.setDate(currentDate.getDate() + (6 - dayOfWeek))
  endOfWeek.setHours(23, 59, 59, 999)

  return { startOfWeek, endOfWeek }
}
