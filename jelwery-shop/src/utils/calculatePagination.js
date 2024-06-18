export function caculatePagination(perPage, curentPage, data) {
  const startPoint = curentPage * perPage
  const endPoint = startPoint + perPage
  const currentData = data.slice(startPoint, endPoint)
  return currentData
}
