import { useForm } from 'react-hook-form'
import Input from '../../component/ui/Input'
import Button from '../../component/ui/Button'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
const items = [
  { name: 'item1', quantity: 1, price: 100 },
  { name: 'item2', quantity: 2, price: 200 },
  { name: 'item3', quantity: 3, price: 300 },
]
function CustomProduct() {
  const { state } = useLocation()
  const { listProductMaterial } = useSelector((state) => state.productMaterial)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: 'test' } })
  const onSubmit = async (data) => {
    console.log(data)
  }
  console.log(listProductMaterial)
  useEffect(() => {
    dispatch({ type: 'PRODUCT_MATERIAL_BY_ID', payload: 1 })
  }, [])
  return (
    <div className="px-[14%]">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default CustomProduct
