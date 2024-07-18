import { useParams } from 'react-router-dom'

import ProductSection from './ProductSection'
import ReviewSection from './ReviewSection'

function ProductDetail() {
  const { productId } = useParams()
  return (
    <>
      <ProductSection productId={productId} />
      <ReviewSection productId={productId} />
    </>
  )
}

export default ProductDetail

// const { currentUser, isAuth } = useSelector((state) => state.auth)

// useEffect(() => {
//   if (!currentUser?.email && isAuth) {
//     dispatch({ type: 'GET_USER_BY_ID_SAGA', payload: currentUser?.userID })
//   }
// }, [currentUser?.email, isAuth])
