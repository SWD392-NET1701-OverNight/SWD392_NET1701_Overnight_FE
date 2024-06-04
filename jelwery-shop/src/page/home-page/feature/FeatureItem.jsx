function FeatureItem({ icon, title, description, alt }) {
  return (
    <div className="w-[30%]">
      <img src={icon} alt={alt} className="image mx-auto w-[200px]" />
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <p className="mt-2 text-justify text-base text-third">{description}</p>
    </div>
  )
}

export default FeatureItem
