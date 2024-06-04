import JewelrySection from './JewelrySection'
import CategorySection from './category/CategorySection'
import FeatureSection from './feature/FeatureSection'
import HeroSection from './hero/HeroSection'

function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="px-[14%]">
        <FeatureSection />
        <CategorySection />
        <JewelrySection />
      </div>
    </>
  )
}

export default HomePage
