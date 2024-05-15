import CryptoJS from "crypto-js"

const HashKey = import.meta.env.REACT_APP_HASH_KEY

export const randomNumber = () => {
  const min = 100000
  const max = 999999
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export const getListComboKey = (key, listSystemKey) => {
  const parent = listSystemKey?.find(i => i?.KeyName === key)
  if (!!parent)
    return parent?.Parents
  return []
}

export const setLocalStorage = (name, value) => {
  return localStorage.setItem(name, value)
}

export const getLocalStorage = (name) => {
  return localStorage.getItem(name)
}

export const removeLocalStorage = (name) => {
  return localStorage.removeItem(name)
}

export const decodeData = data_hashed => {
  const decryptedBytes = CryptoJS.AES.decrypt(
    data_hashed,
    HashKey,
  )
  return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))
}
