import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react'


const TABLE_HEAD = ["ID", "UserID", "ProductID", "Content", "Rate", "Action"];

function FeedbackManager() {
  const [FBcontent, setFBcontent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredfb = FBcontent.filter(fb =>
    fb.productID.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    axios.get('https://localhost:7147/get-all-feedback')
      .then(response => {
        console.log(response.data.$values)
        if (response.data && response.data.data && response.data.data.$values) {
          setFBcontent(response.data.data.$values);
        } else {
          setFBcontent([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
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

  const fetchProductDetails = (productId) => {
    axios.get(`https://localhost:7147/api/Product/get-Products-by-id?id=${productId}`)
      .then(response => {
        setSelectedProduct(response.data); // Assuming API response contains the product details
        setDialogOpen(true); // Open the dialog to show product details
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
        setSelectedProduct(null);
        setDialogOpen(false);
      });
  };

  const handleClickModal = (productId) => {
    fetchProductDetails(productId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="w-72">
          <Input
            color="blue"
            label="Search here"
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-2 py-1 border"
          />
        </div>
      </div>

      <Card className="h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
                  onClick={() => requestSort(index === 0 ? 'materialID' : head.toLowerCase().replace(' ', ''))}
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
            {filteredfb.map(fbcont => (
              <tr key={fbcont.feedBackID}>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {fbcont.feedBackID}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {fbcont.userID}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {fbcont.productID}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {fbcont.content}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {fbcont.rate} /5
                  </Typography>
                </td>
                <td>
                  <button
                    onClick={() => handleClickModal(fbcont.productID)} 
                  >
                    <Eye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {selectedProduct && (
        <Dialog open={dialogOpen} size="sm" onClose={() => setDialogOpen(false)}>
          <DialogHeader>
            <Typography variant="h4" color="blue-gray">
              Product Details
            </Typography>
          </DialogHeader>
          <DialogBody>
            <div className="p-4">
              <p><strong>Product ID:</strong> {selectedProduct.productID}</p>
              <p><strong>Product Name:</strong> {selectedProduct.productName}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <img src={selectedProduct.image} alt={selectedProduct.productName} className="w-full h-auto my-4" />
              <p><strong>Price Material:</strong> {selectedProduct.priceMaterial}</p>
              <p><strong>Price Design:</strong> {selectedProduct.priceDesign}</p>
              <p><strong>Process Price:</strong> {selectedProduct.processPrice}</p>
              <p><strong>Status:</strong> {selectedProduct.status}</p>
              <p><strong>Created By:</strong> {selectedProduct.createBy}</p>
              <p><strong>Create Date:</strong> {new Date(selectedProduct.createDate).toLocaleDateString()}</p>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button color="blue" onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  )
}

export default FeedbackManager
