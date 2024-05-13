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
