import { MoveRight } from 'lucide-react'

function CategoryItem({ title, image, alt }) {
  return (
    <div className="flex-1 shadow-lg">
      <img src={image} alt={alt} className="image h-[240px] w-full" />
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <h3 className="text-xl font-semibold text-secondary">{title}</h3>
          <p className="text-third">Explore Now</p>
        </div>
        <MoveRight className="text-third" />
      </div>
    </div>
  )
}

export default CategoryItem
