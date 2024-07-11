import React, { useState, useEffect } from 'react'
import { Button, Rating } from '@material-tailwind/react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function MyFeedback() {
  const [productID, setProductID] = useState('')
  const [products, setProducts] = useState([])
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState('')
  const { currentUser } = useSelector((state) => state.auth)
  const userid = currentUser.userID

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://localhost:7147/api/Request/get-request-by-userID/US00005',
        )
        if (response.data && response.data.data.$values) {
          setProducts(response.data.data.$values)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const handleProductChange = (event) => {
    setProductID(event.target.value)
  }

  const handleRatingChange = (value) => {
    setRating(value)
  }

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const feedbackData = {
      content: content,
      rate: rating,
      userID: userid,
      productID: parseInt(productID),
    }

    try {
      const response = await axios.post('https://localhost:7147/create-feedback', feedbackData)
      console.log('Feedback submitted:', response.data)
    } catch (error) {
      console.error('Error submitting feedback:', error)
    }
  }

  return (
    <>
      <h2 className="title text-lg">We appreciate your feedback.</h2>
      <form onSubmit={handleSubmit} className="w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <label htmlFor="product">Select a Product</label>
          <select
            id="product"
            value={productID}
            onChange={handleProductChange}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            {products.map((product) => (
              <option key={product?.productID} value={product?.productID}>
                {product?.productName}
              </option>
            ))}
          </select>
          <h2 variant="h6" color="blue-gray" className="-mb-3">
            Rating
          </h2>
          {/* Star rating component, replace with your implementation */}
          <Rating value={rating} onChange={handleRatingChange} />
          <h2 variant="h6" color="blue-gray" className="-mb-3">
            Content
          </h2>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Enter your feedback here"
            className="h-32 w-full resize-none rounded-md border border-gray-300 p-2"
          />
        </div>
        <Button className="mt-6" fullWidth type="submit">
          Send
        </Button>
      </form>
    </>
  )
}

export default MyFeedback
