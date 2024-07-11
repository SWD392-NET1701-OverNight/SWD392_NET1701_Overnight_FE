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
  DialogFooter, List, ListItem
} from '@material-tailwind/react'
import { array, object } from 'zod';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product for dialog display
  const [designs, setDesigns] = useState([]); // State to store designs
  const [designDialogOpen, setDesignDialogOpen] = useState(false); // State to manage design dialog open/close
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
  const [categories, setCategories] = useState([]); // State to store categories
  const [materials, setMaterials] = useState([]);
  const [ListMaterials, setListMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term
  const [selectedMaterial, setSelectedMaterial] = useState(null);
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
    // Apply filter based on status selection and search term
    let filtered = products;
    if (statusFilter !== "All") {
      filtered = filtered.filter(product => product.status.toLowerCase() === statusFilter.toLowerCase());
    }
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [statusFilter, products, searchTerm])

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
    setSelectedProduct(null); // Reset selected product when dialog is closed
  };

  const handleShowCreatedialogClick = () => {
    axios.get('https://localhost:7147/api/Design/get-all-design') // Fetch all designs
      .then(response => {
        const data = response.data.$values;
        if (Array.isArray(data)) {
          setDesigns(data);
          setDesignDialogOpen(true); // Open designs dialog
        } else {
          console.error('API response is not an array');
        }
      })
      .catch(error => {
        console.error('There was an error fetching the designs!', error);
      });
    axios.get('https://localhost:7147/api/Category/get-all-Category')
      .then(response => {
        const data = response.data.$values; // Access the nested $values property
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('API response is not an array');
        }
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
    axios.get('https://localhost:7147/api/Material/get-all-Material')
      .then(response => {
        const data = response.data.data.$values; // Access the nested $values property
        if (Array.isArray(data)) {
          console.log(data);
          setMaterials(data);
        } else {
          console.error('API response is not an array');
        }
      })
      .catch(error => {
        console.error('There was an error fetching the materials!', error);
      });
  };

  const handleCloseDesignDialog = () => {
    setDesignDialogOpen(false); // Close designs dialog
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddMaterialClick = () => {

    setListMaterials(get => { const newMaterial = [...get.map(item => ({ ...item }))] 
    newMaterial.push(selectedMaterial)
    return newMaterial
  }  
    )

  };
  function getmate(event) {
    setSelectedMaterial(event)

  }
  return (
    <div className="space-y-4">
      <div className="w-72" style={{ margin: '0 15px', display: 'flex' }}>
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
        <Button variant="outlined" onClick={handleShowCreatedialogClick}>Show</Button>
      </div>

      {/* Search box */}
      <div className="w-72" style={{ margin: '0 15px', display: 'flex' }}>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded m-2"
          placeholder="Search by Product Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
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

      {/* Dialog for create product */}
      <Dialog
        open={designDialogOpen}
        handler={handleCloseDesignDialog}
        className="w-full max-w-4xl" // Increase dialog width
      >
        <DialogHeader>Create Product</DialogHeader>
        <DialogBody className="flex">
          {/* Left side with input box */}
          <div className="w-1/2 p-4">
            <input type="text" className="w-full p-2 border border-gray-300 rounded m-2" placeholder="Product Name" />
            <input type="text" className="w-full p-2 border border-gray-300 rounded m-2" placeholder="Description" />
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
            <Button variant="gradient" className="flex items-center gap-3" onClick={handleUploadClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload Image
            </Button>

            {selectedFile && (
              <div>
                <Typography>{selectedFile.name}</Typography>
                <img src={imagePreview} alt="Selected" className="mt-2 h-24 w-24 object-cover" />
              </div>
            )}
            <div>

              <Select variant="outlined" label="Select Material" onChange={getmate}>
                {materials.length > 0 ? (
                  materials.map((mate) => (
                    <Option key={mate.materialID} value={mate}>
                      {mate.name} - price :  {mate.price}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No materials available</Option>
                )}
              </Select>
              <Button className="flex items-center gap-3" onClick={handleAddMaterialClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                Add
              </Button>
            </div>
            {/* <Card className="w-96">
              <List>
              {materials.length > 0 ? (
                  materials.map((mate) => (
                    <ListItem key={mate.materialID} value={mate}>
                      {mate.name} - price :  {mate.price}
                    </ListItem>
                    
                  ))
                ) : (
                  <ListItem disabled>No materials available</ListItem>
                )}
               

              </List>
            </Card> */}

          </div>

          {/* Right side with dropdown */}
          <div className="w-1/2 p-4 overflow-y-auto max-h-96 space-y-4">
            <Select variant="static" label="Select Design">
              {designs.length > 0 ? (
                designs.map((design) => (
                  <Option key={design.designID} value={design.designID}>
                    <div className="flex items-center">
                      <img src={design.picture} alt={`Design ${design.designID}`} className="h-8 w-8 object-cover mr-2" />
                      {`Design ID: ${design.designID} by ${design.createBy}`}
                    </div>
                  </Option>
                ))
              ) : (
                <Option disabled>No designs available</Option>
              )}
            </Select>
            <Select variant="outlined" label="Select Category">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Option key={category.catID} value={category.catID}>
                    {category.catName}
                  </Option>
                ))
              ) : (
                <Option disabled>No categories available</Option>
              )}
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleCloseDesignDialog}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default ProductManager
