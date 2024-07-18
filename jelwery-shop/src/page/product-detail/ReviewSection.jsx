import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Rating } from '@material-tailwind/react'
import HeadingSection from '../../component/ui/HeadingSection'
function ReviewSection({ productId }) {
  const dispatch = useDispatch()
  const { listUser } = useSelector((state) => state.auth)
  const { listFeedback } = useSelector((state) => state.feedback)
  const feedbackData = listFeedback?.filter((item) => item.productID === Number(productId))
  const feedbacks = feedbackData?.map(({ userID, ...item }) => {
    const { fullName } = listUser?.find((user) => user.userID === userID)
    return {
      ...item,
      fullName,
    }
  })
  useEffect(() => {
    dispatch({ type: 'GET_ALL_USER_SAGA' })
    dispatch({ type: 'GET_LIST_FEEDBACK_SAGA' })
  }, [listUser.length])
  return (
    <>
      <div className="px-[14%] pt-[50px]">
        <HeadingSection title="Reviews" />
        <div className="mt-[20px] space-y-4">
          {feedbacks?.map(({ rate, content, fullName }, index) => (
            <div className="w-full bg-fourth px-6 py-3">
              <Rating value={rate} readonly className="cursor-none" />
              <h4 className="my-2 text-lg font-normal text-third">{content}</h4>
              <p className="font-medium text-secondary">{fullName}</p>
            </div>
          ))}
          {feedbacks?.length === 0 && (
            <div className="w-full bg-fourth px-6 py-3 text-center">
              <p className="font-medium text-secondary">No review yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ReviewSection
