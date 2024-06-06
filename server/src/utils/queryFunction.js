export const getOneDocument = async (model, filed, value) => {
  const data = await model.findOne({ [filed]: value })
  return data
}

export const handleListQuery = async (promises) => {
  const listPromises = promises.map(i => i)
  return await Promise.all(listPromises)
}