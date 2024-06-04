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
        <h1 className="text-9xl font-semibold">Custom Jewelry Crafting Services</h1>
        <p className="mt-[60px]  text-4xl font-bold">
          Transform Your Ideas into Exquisite Jewelry Pieces
        </p>
        <div className="center">
          <Link to="product-list" className="btn mt-[100px] bg-third text-fourth">
            Buy Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
