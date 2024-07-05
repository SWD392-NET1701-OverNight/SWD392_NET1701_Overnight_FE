import React, { useEffect, useState } from 'react'
import axios from 'axios'

function DesignManager() {
  const [designItems, setDesignItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newDesign, setNewDesign] = useState({
    createBy: '',
    picture: '',
    description: '',
    createDate: '',
  })
  const [editDesign, setEditDesign] = useState({
    designID: 0,
    createBy: '',
    picture: '',
    old_Picture: '', // Added for managing old picture URL
    description: '',
    createDate: '',
  })
  const [fileSelected, setFileSelected] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])
  console.log(designItems)
  const fetchData = () => {
    axios
      .get('https://localhost:7147/api/Design/get-all-design')
      .then((response) => {
        if (response.data && response.data.$values) {
          setDesignItems(response.data.$values)
        } else {
          setDesignItems([])
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('There was an error fetching the design data!', error)
        setError(error)
        setLoading(false)
      })
  }

  function getTopThreeLatestDesigns(designs) {
    if (!Array.isArray(designs) || designs.length === 0) {
      return []
    }
    return designs.slice(0, 3)
  }

  function handleCreateNewDesign() {
    const currentDate = new Date().toISOString()
    setNewDesign({
      createBy: '',
      picture: '',
      description: '',
      createDate: currentDate,
    })
    setShowCreateDialog(!showCreateDialog)
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    if (showEditDialog) {
      setEditDesign((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    } else {
      setNewDesign((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (showEditDialog) {
          setEditDesign((prevState) => ({
            ...prevState,
            picture: reader.result,
          }))
        } else {
          setNewDesign((prevState) => ({
            ...prevState,
            picture: reader.result,
          }))
        }
        setFileSelected(true)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios
      .post('https://localhost:7147/api/Design/create-design', newDesign)
      .then((response) => {
        console.log('Design created successfully:', response.data)
        setShowCreateDialog(false)
        fetchData()
      })
      .catch((error) => {
        console.error('Error creating design:', error)
      })
  }

  function handleEditDesign(design) {
    setEditDesign({
      ...editDesign,
      designID: design.designID, // Make sure this matches your design object property name
      createBy: design.createBy,
      picture: design.picture,
      old_Picture: design.old_Picture, // Ensure old picture URL is correctly set
      description: design.description,
      createDate: design.createDate,
    })
    setShowEditDialog(true)
    setFileSelected(true) // Assuming the picture already exists
  }

  // function handleEditSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('designID', editDesign.designID);
  //   formData.append('createBy', editDesign.createBy);
  //   formData.append('description', editDesign.description);
  //   formData.append('createDate', editDesign.createDate);

  //   // Check if picture has changed
  //   if (editDesign.picture !== editDesign.old_Picture) {
  //     formData.append('picture', editDesign.picture);
  //     formData.append('old_Picture', editDesign.old_Picture);
  //   } else {
  //     formData.append('old_Picture', ''); // Ensure server handles empty string correctly
  //   }

  //   console.log("???",formData);
  //   axios.put(`https://localhost:7147/api/Design/Update-design`, formData)
  //     .then(response => {
  //       console.log("Design updated successfully:", response.data);
  //       setShowEditDialog(false);
  //       fetchData();
  //     })
  //     .catch(error => {
  //       console.error("Error updating design:", error);
  //     });
  // }
  function handleEditSubmit(event) {
    event.preventDefault()

    const requestData = {
      designID: editDesign.designID,
      createBy: editDesign.createBy,
      description: editDesign.description,
      createDate: editDesign.createDate,
      picture: editDesign.picture,
      old_Picture: editDesign.old_Picture,
    }

    axios
      .put(`https://localhost:7147/api/Design/Update-design`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Design updated successfully:', response.data)
        setShowEditDialog(false)
        fetchData()
      })
      .catch((error) => {
        console.error('Error updating design:', error)
      })
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">Error fetching data</div>
  }

  const topThreeLatestDesigns = getTopThreeLatestDesigns(designItems)
  const otherDesigns = designItems.filter((item) => !topThreeLatestDesigns.includes(item))

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Design Manager</h1>

      <button
        onClick={handleCreateNewDesign}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Create New Design
      </button>

      {showCreateDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="rounded bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Create New Design</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Created By</label>
                <input
                  type="text"
                  name="createBy"
                  value={newDesign.createBy}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Picture</label>
                <input
                  type="file"
                  name="picture"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                  required={!fileSelected}
                />
                <label
                  htmlFor="file-upload"
                  className="flex cursor-pointer select-none items-center gap-3 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
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
                </label>
                {newDesign.picture && (
                  <img
                    src={newDesign.picture}
                    alt="Preview"
                    className="mt-4 h-48 w-full rounded object-cover"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newDesign.description}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Create Date</label>
                <input
                  type="datetime-local"
                  name="createDate"
                  value={newDesign.createDate}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="mr-2 rounded bg-blue-500 px-4 py-2 text-white">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCreateNewDesign}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="rounded bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Edit Design</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Created By</label>
                <input
                  type="text"
                  name="createBy"
                  value={editDesign.createBy}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Picture</label>
                <input
                  type="file"
                  name="picture"
                  id="file-upload-edit"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                  required={!fileSelected}
                />
                <label
                  htmlFor="file-upload-edit"
                  className="flex cursor-pointer select-none items-center gap-3 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
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
                </label>
                {editDesign.picture && (
                  <img
                    src={editDesign.picture}
                    alt="Preview"
                    className="mt-4 h-48 w-full rounded object-cover"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={editDesign.description}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Create Date</label>
                <input
                  type="datetime-local"
                  name="createDate"
                  value={editDesign.createDate}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="mr-2 rounded bg-blue-500 px-4 py-2 text-white">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditDialog(false)}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Latest Designs</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {topThreeLatestDesigns.map((item, index) => (
            <div key={index} className="rounded border p-4 shadow">
              <img
                src={
                  item.picture ||
                  'https://res.cloudinary.com/dkyv1vp1c/image/upload/v1718934488/t%E1%BA%A3i_xu%E1%BB%91ng_5_idskma.jpg'
                }
                alt={item.description}
                className="h-48 w-full rounded object-cover"
              />
              <div className="mt-2">
                <h2 className="font-semibold">Create By: {item.createBy}</h2>
                <p className="text-gray-600">
                  <small>{new Date(item.createDate).toLocaleDateString()}</small>
                </p>
                <button
                  onClick={() => handleEditDesign(item)}
                  className="mt-2 rounded bg-green-500 px-4 py-2 text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Other Designs</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {otherDesigns.map((item, index) => (
            <div key={index} className="rounded border p-4 shadow">
              <img
                src={
                  item.picture ||
                  'https://res.cloudinary.com/dkyv1vp1c/image/upload/v1718934488/t%E1%BA%A3i_xu%E1%BB%91ng_5_idskma.jpg'
                }
                alt={item.description}
                className="h-48 w-full rounded object-cover"
              />
              <div className="mt-2">
                <h2 className="font-semibold">Create By: {item.createBy}</h2>
                <p className="text-gray-600">
                  <small>{new Date(item.createDate).toLocaleDateString()}</small>
                </p>
                <button
                  onClick={() => handleEditDesign(item)}
                  className="mt-2 rounded bg-green-500 px-4 py-2 text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DesignManager
