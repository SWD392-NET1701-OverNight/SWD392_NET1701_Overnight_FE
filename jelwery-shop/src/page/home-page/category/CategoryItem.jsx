import { MoveRight } from 'lucide-react'
import CardSection from '../../../component/ui/CardSection'

function CategoryItem(props) {
  return (
    <CardSection className="flex-1" {...props} description="Explore Now">
      <MoveRight className="text-third" />
    </CardSection>
  )
}

export default CategoryItem
