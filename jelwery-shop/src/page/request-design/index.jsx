import { toast } from 'sonner'
import Button from '../../component/ui/Button'
import { useUploadImage } from '../../hooks/useUploadImage'
import { sendHttp } from '../../utils/send-http'
import requestApi from '../../feature/request/requestApi'
import { useSelector } from 'react-redux'
import { getToken } from '../../utils/auth'
import { useState } from 'react'
import { set } from 'react-hook-form'

function RequestDesign() {
  const { currentUser } = useSelector((state) => state.auth)
  const [error, setError] = useState({ image: false, description: false })
  const { hanldeUpload, onSetImageUrl, imageUrl } = useUploadImage()
  async function handleSubmit(e) {
    e.preventDefault()
    if (!getToken()) {
      toast.error('Please login to create a request')
      return
    }
    const formData = new FormData(e.target)
    const descriptionObject = Object.fromEntries(formData.entries())
    let error = {}
    if (!imageUrl) {
      error.image = true
    } else {
      error.image = false
    }
    if (!descriptionObject.description) {
      error.description = true
    } else {
      error.description = false
    }

    if (error.description || error.image) {
      setError((prev) => ({ ...prev, ...error }))
      return
    }
    const requestData = {
      ...descriptionObject,
      image: imageUrl,
      type: 3,
      status: 'Processing',
    }
    const userID = currentUser?.userID
    const { status } = await sendHttp(requestApi.createRequest, requestData, userID, {
      success: 'Request created successfully',
      error: 'Request creation failed',
    })
    if (status === 'success') {
      e.target.reset()
      onSetImageUrl('')
      setError({ image: false, description: false })
    }
  }
  return (
    <div className="flex gap-[10%] px-[14%] pt-[50px]">
      <div className="w-[40%]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="design"
            className="image h-[60vh] w-full rounded-xl"
            onClick={() => {
              hanldeUpload()
            }}
          />
        )}
        {!imageUrl && (
          <div className="h-[60vh] w-full rounded-xl bg-gray-200">
            <div className="flex h-full items-center justify-center">
              <button
                className="btn text-xl text-gray-500"
                onClick={() => {
                  hanldeUpload()
                }}
              >
                Upload Design
              </button>
            </div>
          </div>
        )}
        {error.image && <p className="text-center text-red-500">Please upload an image</p>}
      </div>
      <form className="w-[50%]" onSubmit={handleSubmit}>
        <label htmlFor="description" className="mb-4 block text-xl font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="h-[70%] w-full rounded-lg border-2 border-solid border-secondary px-4 py-2 outline-none"
          placeholder="Description"
        ></textarea>
        {error.description && (
          <p className="mt-2 text-center text-red-500">Please enter a description</p>
        )}
        <Button type="primary" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default RequestDesign
