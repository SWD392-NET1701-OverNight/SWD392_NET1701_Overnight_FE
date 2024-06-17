function FeatureItem({ icon, title, description, alt }) {
  return (
    <div className="space-y-4">
      <img src={icon} alt={alt} className="image mx-auto w-[200px]" />
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <p className="text-justify text-base text-third">{description}</p>
    </div>
  )
}

export default FeatureItem
