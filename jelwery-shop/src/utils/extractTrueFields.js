export function extractTrueFields(data) {
  const result = []
  let index = 0
  Object.keys(data).forEach((key) => {
    if (data[key] === true) {
      const amountKey = `${key}-amount`
      result[index] = { productMaterialID: Number(key), amount: data[amountKey] }
      index++
    }
  })
  return result
}
