import { Link } from 'react-router-dom'
function HeroSection() {
  return (
    <section className="relative">
      <img
        src="https://plus.unsplash.com/premium_photo-1661338902363-fc3f8059fead?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="hero-img"
        className="image "
      />
      <div className="absolute top-[20%] text-center text-fourth">
        <h1 className="text-3xl font-semibold  md:text-7xl lg:text-8xl xl:text-9xl">
          Custom Jewelry Crafting Services
        </h1>
        <p className="mt-[5%] text-sm font-bold md:text-2xl  lg:text-3xl xl:text-4xl">
          Transform Your Ideas into Exquisite Jewelry Pieces
        </p>
        <div className="center">
          <Link to="product-list" className="btn mt-[8%] bg-third text-fourth">
            Buy Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
