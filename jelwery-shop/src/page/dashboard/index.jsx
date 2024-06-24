import { useState } from 'react'
import DashBoardLayout from '../../layout/dashboard'
import Table from '../../component/ui/Table'
import { PieChart, 
  Pie, Tooltip, 
  ResponsiveContainer,
  Cell ,Legend,BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
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

const datachart = [
  {name : "Order Custom",value : 15},
  {name : "Order Design",value : 10},
  {name : "Order exist",value : 30},
]
const data2 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const date = new Date();
const month = date.toLocaleString('en-US', { month: 'long' });


const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
function Dashboard() {
  const [currentTab, setCurrentTab] = useState('Statistics')
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
    <div style={{ width: '100%', height: 400 }}>    
      <ResponsiveContainer>   
          <PieChart>
          <Pie
            dataKey="value"
            data={datachart}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80}
            fill="#82ca9d"
          > 
          {datachart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
          </Pie>
          <Tooltip />         
        </PieChart>
        {/* <h1>Current Month: {month}</h1>     */}
      </ResponsiveContainer>
    </div>
    <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data2}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    {/* <Table TABLE_HEAD={TABLE_HEAD} TABLE_BODY={TABLE_BODY} /> */}
  </DashBoardLayout>
  )
}

export default Dashboard
