import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Typography, Rating } from '@material-tailwind/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function MyFeedback() {
  const [productID, setProductID] = useState('');
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const { currentUser } = useSelector((state) => state.auth)
  const userid = currentUser.userID;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7147/api/Request/get-request-by-userID/US00005');
        console.log(response.data.data.$values)
        if (response.data && response.data.data.$values) {
          setProducts(response.data.data.$values);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (event) => {
    setProductID(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      content: content,
      rate: rating,
      userID: userid,
      productID: parseInt(productID),
    };

    try {
      const response = await axios.post('https://localhost:7147/create-feedback', feedbackData);
      console.log('Feedback submitted:', response.data);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      <Card color="transparent" shadow={false} style={{ marginLeft: 50 }}>
        <Typography color="gray" className="mt-1 font-normal">
          We appreciate your feedback.
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Select Product
            </Typography>
            <select
              value={productID}
              onChange={handleProductChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.productID} value={product.productID}>
                  {product.productName}
                </option>
              ))}
            </select>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Rating
            </Typography>
            {/* Star rating component, replace with your implementation */}
            <Rating value={rating} onChange={handleRatingChange} />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Content
            </Typography>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Enter your feedback here"
              className="border border-gray-300 rounded-md p-2 w-full resize-none h-32"
            />
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default MyFeedback;
