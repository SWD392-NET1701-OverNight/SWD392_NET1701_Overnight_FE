function FeatureItem({ icon, title, description, alt }) {
  return (
    <div>
      <img src={icon} alt={alt} className="image mx-auto w-[200px]" />
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <p className="mt-2 text-base text-third xl:text-justify">{description}</p>
    </div>
  )
}

export default FeatureItem
