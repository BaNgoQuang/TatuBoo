import CryptoJS from "crypto-js"
import * as dotenv from "dotenv"
dotenv.config()

export const randomNumber = () => {
  const min = 100000
  const max = 999999
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export const getOneDocument = async (model, filed, value) => {
  const data = await model.findOne({ [filed]: value })
  return data
}

export const encodeData = object => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(object),
    process.env.HASH_KEY,
  ).toString()
}

export const randomPassword = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
