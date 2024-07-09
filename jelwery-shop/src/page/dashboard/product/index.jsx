import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'

const ProductManager = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null) // Track the selected product for dialog display

  useEffect(() => {
    axios
      .get('https://localhost:7147/api/Product/get-all-Products')
      .then((response) => {
        const data = response.data.$values // Access the nested $values property
        if (Array.isArray(data)) {
          setProducts(data)
          setFilteredProducts(data) // Initialize filteredProducts with all products
        } else {
          console.error('API response is not an array')
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the products!', error)
      })
  }, [])

  useEffect(() => {
    // Apply filter based on status selection
    if (statusFilter === 'All') {
      setFilteredProducts(products) // Show all products
    } else {
      const filtered = products.filter(
        (product) => product.status.toLowerCase() === statusFilter.toLowerCase(),
      )
      setFilteredProducts(filtered)
    }
  }, [statusFilter, products])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-blue-500'
      case 'in-processing':
        return 'bg-yellow-500'
      case 'done':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleReadMoreClick = (product) => {
    setSelectedProduct(product) // Set selected product for dialog display
  }

  const handleCloseDialog = () => {
    setSelectedProduct(null) // Reset selected product when dialog is closed
  }

  return (
    <div className="space-y-4">
      <div className="w-72">
        <Select
          label="Filter by Status"
          value={statusFilter}
          onChange={(val) => setStatusFilter(val)}
        >
          <Option value="All">View All</Option>
          <Option value="Available">Available</Option>
          <Option value="In-Processing">In-Processing</Option>
          <Option value="Done">Done</Option>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts?.map((product) => (
          <Card key={product.productID} className="mt-6 w-96">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={product.image}
                alt={product.productName}
                className="h-full w-full object-cover object-center"
              />
              <div
                className={`absolute bottom-0 left-0 right-0 ${getStatusColor(product.status)} bg-opacity-75 p-2`}
              >
                <Typography variant="body2" color="white">
                  {product.status}
                </Typography>
              </div>
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Product Name: {product.productName}
              </Typography>
              <Typography>
                Created Date: {new Date(product.createDate).toLocaleDateString()}{' '}
                {/* Format createDate */}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button onClick={() => handleReadMoreClick(product)}>Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Dialog for displaying detailed product information */}
      <Dialog open={!!selectedProduct} handler={handleCloseDialog}>
        {selectedProduct && (
          <>
            <DialogHeader>{selectedProduct.productName}</DialogHeader>
            <DialogBody>
              <Typography>Product ID: {selectedProduct.productID}</Typography>
              <Typography>Status: {selectedProduct.status}</Typography>
              <Typography>Description: {selectedProduct.description}</Typography>
              <Typography>
                Created Date: {new Date(selectedProduct.createDate).toLocaleString()}{' '}
                {/* Format createDate */}
              </Typography>
              {/* Add more fields as needed */}
            </DialogBody>
            <DialogFooter>
              <Button variant="text" color="red" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button variant="gradient" color="green" onClick={handleCloseDialog}>
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </div>
  )
}

export default ProductManager
