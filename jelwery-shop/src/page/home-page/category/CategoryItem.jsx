import { MoveRight } from 'lucide-react'
import CardSection from '../../../component/ui/CardSection'

function CategoryItem({ catName, description, ...props }) {
  return (
    <CardSection className="flex-1" {...props} description={description} name={catName}>
      <MoveRight className="text-third" />
    </CardSection>
  )
}

export default CategoryItem
