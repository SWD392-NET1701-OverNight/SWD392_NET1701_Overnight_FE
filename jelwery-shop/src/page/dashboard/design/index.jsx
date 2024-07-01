import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DesignManager() {
  const [designItems, setDesignItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newDesign, setNewDesign] = useState({
    createBy: '',
    picture: '',
    description: '',
    createDate: ''
  });
  const [editDesign, setEditDesign] = useState({
    designID: '',
    createBy: '',
    picture: '',
    description: '',
    createDate: ''
  });
  const [fileSelected, setFileSelected] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://localhost:7147/api/Design/get-all-design')
      .then(response => {
        if (response.data && response.data.$values) {
          setDesignItems(response.data.$values);
        } else {
          setDesignItems([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the design data!", error);
        setError(error);
        setLoading(false);
      });
  };

  function getTopThreeLatestDesigns(designs) {
    if (!Array.isArray(designs) || designs.length === 0) {
      return [];
    }
    return designs.slice(0, 3);
  }

  function handleCreateNewDesign() {
    const currentDate = new Date().toISOString();
    setNewDesign({
      createBy: '',
      picture: '',
      description: '',
      createDate: currentDate
    });
    setShowCreateDialog(!showCreateDialog);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (showEditDialog) {
      setEditDesign(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setNewDesign(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (showEditDialog) {
          setEditDesign(prevState => ({
            ...prevState,
            picture: reader.result
          }));
        } else {
          setNewDesign(prevState => ({
            ...prevState,
            picture: reader.result
          }));
        }
        setFileSelected(true);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('https://localhost:7147/api/Design/create-design', newDesign)
      .then(response => {
        console.log("Design created successfully:", response.data);
        setShowCreateDialog(false);
        fetchData();
      })
      .catch(error => {
        console.error("Error creating design:", error);
      });
  }

  function handleEditDesign(design) {
    setEditDesign({
      designID: design.id, // Make sure to set the designID from the design object
      createBy: design.createBy,
      picture: design.picture,
      description: design.description,
      createDate: design.createDate
    });
    setShowEditDialog(true);
    setFileSelected(true); // Assuming the picture already exists
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    axios.put(`https://localhost:7147/api/Design/update-design`, editDesign)
      .then(response => {
        console.log("Design updated successfully:", response.data);
        setShowEditDialog(false);
        fetchData();
      })
      .catch(error => {
        console.error("Error updating design:", error);
      });
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error fetching data</div>;
  }

  const topThreeLatestDesigns = getTopThreeLatestDesigns(designItems);
  const otherDesigns = designItems.filter(item => !topThreeLatestDesigns.includes(item));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Design Manager</h1>

      <button onClick={handleCreateNewDesign} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Create New Design
      </button>

      {showCreateDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create New Design</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Created By</label>
                <input
                  type="text"
                  name="createBy"
                  value={newDesign.createBy}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
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
                <label htmlFor="file-upload" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  Upload Image
                </label>
                {newDesign.picture && (
                  <img
                    src={newDesign.picture}
                    alt="Preview"
                    className="mt-4 w-full h-48 object-cover rounded"
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
                  className="mt-1 p-2 border rounded w-full"
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
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Submit</button>
                <button type="button" onClick={handleCreateNewDesign} className="px-4 py-2 bg-red-500 text-white rounded">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Design</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Created By</label>
                <input
                  type="text"
                  name="createBy"
                  value={editDesign.createBy}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
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
                <label htmlFor="file-upload-edit" className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  Upload Image
                </label>
                {editDesign.picture && (
                  <img
                    src={editDesign.picture}
                    alt="Preview"
                    className="mt-4 w-full h-48 object-cover rounded"
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
                  className="mt-1 p-2 border rounded w-full"
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
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Submit</button>
                <button type="button" onClick={() => setShowEditDialog(false)} className="px-4 py-2 bg-red-500 text-white rounded">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Latest Designs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {topThreeLatestDesigns.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <img
                src={item.picture || 'https://res.cloudinary.com/dkyv1vp1c/image/upload/v1718934488/t%E1%BA%A3i_xu%E1%BB%91ng_5_idskma.jpg'}
                alt={item.description}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-2">
                <h2 className="font-semibold">Create By: {item.createBy}</h2>
                <p className="text-gray-600"><small>{new Date(item.createDate).toLocaleDateString()}</small></p>
                <button
                  onClick={() => handleEditDesign(item)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Other Designs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {otherDesigns.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <img
                src={item.picture || 'https://res.cloudinary.com/dkyv1vp1c/image/upload/v1718934488/t%E1%BA%A3i_xu%E1%BB%91ng_5_idskma.jpg'}
                alt={item.description}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-2">
                <h2 className="font-semibold">Create By: {item.createBy}</h2>
                <p className="text-gray-600"><small>{new Date(item.createDate).toLocaleDateString()}</small></p>
                <button
                  onClick={() => handleEditDesign(item)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesignManager;
