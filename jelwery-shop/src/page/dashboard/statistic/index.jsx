import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const date = new Date();
const month = date.toLocaleString('en-US', { month: 'long' });

function StatisticManager() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7147/api/Request/get-request-by-Date')
      .then((response) => {
        // Assuming the response data needs to be transformed to match the BarChart format
        const transformedData = response.data.map(item => ({
          time: item.time,  // Adjust these keys based on your actual data structure
          orderDesign: item.orderDesign,
          orderCustome: item.orderCustome,
          orderExist: item.orderExist
        }));
        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>   
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orderDesign"  stackId="a" fill="#8884d8" />
            <Bar dataKey="orderCustome" stackId="a" fill="#82ca9d" />
            <Bar dataKey="orderExist" stackId="a" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div> 
    </div>
  );
}

export default StatisticManager;
