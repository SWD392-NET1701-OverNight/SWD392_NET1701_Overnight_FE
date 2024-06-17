import { useState } from 'react'
import DashBoardLayout from '../../layout/dashboard'
import Table from '../../component/ui/Table'
const TABLE_HEAD = ['Id', 'Order', 'Date', 'Total', 'Status', 'Action']
const TABLE_BODY = [
  { id: 1, order: 'Order 1', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 2, order: 'Order 2', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
  { id: 3, order: 'Order 3', date: '2021-09-01', total: 100, status: 'Pending' },
]
function Dashboard() {
  const [currentTab, setCurrentTab] = useState('Products')
  return (
    <DashBoardLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      <div className="flex items-center justify-between px-8 py-3">
        <h2 className="p-link font-semibold">{currentTab}</h2>
        <input
          type="text"
          placeholder={`Search ${currentTab.toLowerCase()}`}
          className="rounded-md border border-solid border-third px-4 py-2 outline-none"
        />
      </div>
      <Table TABLE_HEAD={TABLE_HEAD} TABLE_BODY={TABLE_BODY} />
    </DashBoardLayout>
  )
}

export default Dashboard
