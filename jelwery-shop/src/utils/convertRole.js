export function convertRole(userID) {
  const role = {
    1: 'Admin',
    2: 'Manager',
    3: 'Sale',
    4: 'Production',
    5: 'Design',
  }
  return role[userID]
}
