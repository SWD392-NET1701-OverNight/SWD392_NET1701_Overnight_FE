import React, { useState, useEffect } from 'react'
import { Button, Rating } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendHttp } from '../../../utils/send-http'
import requestApi from '../../../feature/request/requestApi'
import { toast } from 'sonner'
import { feedbackSchema } from '../../../schema/feedbackSchema'
import ErrorInput from '../../../component/ui/ErrorInput'
import feedbackAPI from '../../../feature/feedback/feedbackApi'

function MyFeedback() {
  const { currentUser } = useSelector((state) => state.auth)
  const [listRequest, setListRequest] = useState([])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  })
  const userid = currentUser.userID
  const allRequests = listRequest?.filter((request) => request?.status === 'Done')
  async function getAllReqByUserID() {
    const { resData } = await sendHttp(requestApi.getAllRequestByUserID, userid, null, null, false)
    if (resData) {
      setListRequest(resData.data.$values)
    }
  }
  useEffect(() => {
    getAllReqByUserID()
  }, [])
  const onSubmit = async (data) => {
    const feedbackData = { ...data, userID: userid }
    const { resData } = await sendHttp(feedbackAPI.createFeedback, feedbackData)
    if (resData) {
      reset()
    }
  }

  return (
    <>
      <h2 className="title text-lg">We appreciate your feedback.</h2>
      <form onSubmit={handleSubmit(onSubmit)} className=" max-w-screen-lg sm:w-96">
        <div className="mt-2 space-y-4">
          <label htmlFor="product" className="text-lg font-normal text-secondary">
            Select a Product
          </label>
          <select
            id="product"
            {...register('productID')}
            className="w-full rounded-md border border-gray-300 p-2 outline-none"
          >
            {allRequests?.map((product, index) => (
              <option key={index} value={product?.productID}>
                {product?.productName}
              </option>
            ))}
          </select>
          {errors.productID?.message && <ErrorInput>{errors.productID?.message}</ErrorInput>}
          <label htmlFor="rating" className="block text-lg font-normal text-secondary">
            Rating
          </label>

          <Controller
            name="rate"
            control={control}
            render={({ field }) => (
              <Rating
                value={field.value}
                className="w-full"
                onChange={(e) => {
                  field.onChange(e) // Update the value in the form state
                  trigger('rate') // Manually trigger validation for 'rate'
                }}
              />
            )}
          />
          {errors.rate?.message && <ErrorInput>{errors.rate?.message}</ErrorInput>}

          <label htmlFor="content" className="block text-lg font-normal text-secondary">
            Content
          </label>
          <textarea
            id="content"
            {...register('content')}
            placeholder="Enter your feedback here"
            className="h-32 w-full resize-none rounded-md border border-gray-300 p-2"
          />
          {errors.content?.message && <ErrorInput>{errors.content?.message}</ErrorInput>}
        </div>
        <Button className="mt-6" fullWidth type="submit">
          Send
        </Button>
      </form>
    </>
  )
}

export default MyFeedback
