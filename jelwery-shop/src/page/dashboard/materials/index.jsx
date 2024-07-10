import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  Typography,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'

const TABLE_HEAD = ['Material ID', 'Name', 'Price', 'Quantity', 'Total Price', 'Status']

export function MaterialManager() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentMaterial, setCurrentMaterial] = useState({
    matID: 0,
    name: '',
    price: 0,
    quantity: 0,
    totalPrice: 0,
    status: '',
  })

  useEffect(() => {
    axios
      .get('https://localhost:7147/api/Material/get-all-Material')
      .then((response) => {
        if (response.data && response.data.data && response.data.data.$values) {
          setMaterials(response.data.data.$values)
        } else {
          setMaterials([])
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('There was an error fetching the materials data!', error)
        setError(error)
        setLoading(false)
      })
  }, [])

  const sortedMaterials = React.useMemo(() => {
    let sortableMaterials = [...materials]
    if (sortConfig !== null && sortConfig.key !== null) {
      sortableMaterials.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableMaterials
  }, [materials, sortConfig])

  const filteredMaterials = sortedMaterials.filter((material) =>
    material.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <span>↕</span> // Both arrows if not sorted
    }
    return sortConfig.direction === 'ascending' ? <span>↑</span> : <span>↓</span>
  }

  const handleOpenDialog = (material = null) => {
    if (material) {
      setEditMode(true)
      setCurrentMaterial({
        ...material,
        matID: material.materialID, // Set matID from materialID for edit mode
      })
    } else {
      setEditMode(false)
      setCurrentMaterial({
        matID: 0,
        name: '',
        price: 0,
        quantity: 0,
        totalPrice: 0,
        status: '',
      })
    }
    setDialogOpen(true)
  }

  const handleSubmit = () => {
    if (editMode) {
      console.log(currentMaterial)
      axios
        .put(`https://localhost:7147/api/Material/update-Material`, currentMaterial)
        .then((response) => {
          setMaterials(
            materials.map((material) =>
              material.matID === currentMaterial.matID ? currentMaterial : material,
            ),
          )
          handleOpenDialog()
        })
        .catch((error) => {
          console.error('There was an error updating the material!', error)
        })
    } else {
      axios
        .post('https://localhost:7147/api/Material/create-Material', currentMaterial)
        .then((response) => {
          setMaterials([...materials, response.data])
          handleOpenDialog()
        })
        .catch((error) => {
          console.error('There was an error creating the new material!', error)
        })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching data</div>
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="w-72">
          <Input
            color="blue"
            label="Search here"
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-2 py-1"
          />
        </div>
        <div className="flex w-max gap-4">
          <Button onClick={() => handleOpenDialog()} variant="outlined">
            Create new Material
          </Button>
        </div>
      </div>

      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  onClick={() =>
                    requestSort(index === 0 ? 'materialID' : head.toLowerCase().replace(' ', ''))
                  }
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center font-normal leading-none opacity-70"
                  >
                    {head}{' '}
                    {getSortIcon(index === 0 ? 'materialID' : head.toLowerCase().replace(' ', ''))}
                  </Typography>
                </th>
              ))}
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((material) => (
              <tr key={material.materialID}>
                <td className="border-b border-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {material.materialID}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {material.name}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {material.price}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {material.quantity}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {material.totalPrice}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {material.status}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  <Button onClick={() => handleOpenDialog(material)} variant="outlined">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={dialogOpen} size="sm" onClose={() => setDialogOpen(false)}>
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">
            {editMode ? 'Edit Material' : 'Create New Material'}
          </Typography>
        </DialogHeader>
        <DialogBody>
          <div className="grid gap-4">
            <Input
              label="Name"
              value={currentMaterial.name}
              onChange={(e) => setCurrentMaterial({ ...currentMaterial, name: e.target.value })}
            />
            <Input
              label="Price"
              value={currentMaterial.price}
              onChange={(e) => setCurrentMaterial({ ...currentMaterial, price: e.target.value })}
            />
            <Input
              label="Quantity"
              value={currentMaterial.quantity}
              onChange={(e) => setCurrentMaterial({ ...currentMaterial, quantity: e.target.value })}
            />
            <Input
              label="Total Price"
              value={currentMaterial.totalPrice}
              onChange={(e) =>
                setCurrentMaterial({ ...currentMaterial, totalPrice: e.target.value })
              }
            />
            <Input
              label="Status"
              value={currentMaterial.status}
              onChange={(e) => setCurrentMaterial({ ...currentMaterial, status: e.target.value })}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => handleSubmit()} color="blue" ripple="light">
            {editMode ? 'Save Changes' : 'Create Material'}
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="gray" ripple="light">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default MaterialManager
