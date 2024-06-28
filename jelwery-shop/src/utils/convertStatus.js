export function convertStatus(roleID) {
  const status = {
    3: 'All', //Processing and complete and done
    4: 'In-Production',
    5: 'In-Design',
  }
  return status[roleID]
}
export function convertUpdateStatus(roleID, typeProduct, status) {
  switch (roleID) {
    case 2:
      return typeProduct === 3 ? 'In-Design' : 'In-Production'
    case 3:
      return status === 'Completed' ? 'Done' : 'Pending'
    case 4:
      return 'Completed'
    case 5:
      return 'In-Production'
  }
}
