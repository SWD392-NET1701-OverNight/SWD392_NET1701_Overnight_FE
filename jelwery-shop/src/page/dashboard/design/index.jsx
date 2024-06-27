import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DesignManager() {
  const [designItems, setDesignItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newDesign, setNewDesign] = useState({
    createBy: '',
    picture: '',
    description: '',
    createDate: '' // This will hold the full datetime
  });

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
    const currentDate = new Date().toISOString(); // Get current datetime in ISO format
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
    setNewDesign(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDesign(prevState => ({
          ...prevState,
          picture: reader.result
        }));
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
        fetchData(); // Fetch updated designs after successful creation
      })
      .catch(error => {
        console.error("Error creating design:", error);
        // Handle error state if needed
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
                  onChange={handleFileChange}
                  className="mt-1 p-2 border rounded w-full"
                  accept="image/*"
                  required
                />
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
                  type="datetime-local" // Use datetime-local input for full datetime
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesignManager;
