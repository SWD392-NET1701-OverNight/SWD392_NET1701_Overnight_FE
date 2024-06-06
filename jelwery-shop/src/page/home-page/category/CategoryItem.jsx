import { MoveRight } from 'lucide-react'
import CardSection from '../CardSection'

function CategoryItem(props) {
  return (
    <CardSection {...props} description="Explore Now">
      <MoveRight className="text-third" />
    </CardSection>
  )
}

export default CategoryItem
