import { useState } from 'react'
import DashBoardLayout from '../../layout/dashboard'
import OrderManager from './order'

function Dashboard() {
  const [currentTab, setCurrentTab] = useState('Orders')
  return (
    <DashBoardLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {currentTab === 'Orders' && <OrderManager currentTab={currentTab} />}
    </DashBoardLayout>
  )
}

export default Dashboard
