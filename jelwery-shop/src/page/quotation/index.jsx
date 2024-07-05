import { Button, Card, Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


const TABLE_HEAD = ["Name", "Price", "Quantity", "Status"];

function QuotationPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7147/api/Material/get-all-Material')
      .then(response => {
        if (response.data && response.data.data && response.data.data.$values) {
          setMaterials(response.data.data.$values);
        } else {
          setMaterials([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the materials data!", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Typography className="text-4xl font-bold mb-4" style={{ marginLeft: 200 }}>Quotation</Typography>
        <Typography className="mb-4" style={{ marginLeft: 200 }}>
          Below is a detailed quotation for the materials currently available. This table provides all the necessary information including the name, price, quantity, total price, and status of each material. Please review the details to understand the costs and availability of the materials you are interested in.
        </Typography>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="h-full w-full" style={{ width: 1200 }}>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70 flex items-center"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
              </tr>
            </thead>
            <tbody>
              {materials.map(material => (
                <tr key={material.materialID}>
                  <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {material.name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {material.price}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {material.quantity}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {material.status}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}

export default QuotationPage
