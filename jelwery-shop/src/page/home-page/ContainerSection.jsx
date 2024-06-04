function ContainerSection({ title, className, children }) {
  return (
    <section className="mt-[50px] ">
      <div className="flex items-center gap-2">
        <div className="h-8 w-[8px] rounded-md bg-primary"></div>
        <h2 className="title">{title}</h2>
      </div>
      <div className={`mt-[20px] flex justify-between gap-4 ${className}`}>{children}</div>
    </section>
  )
}

export default ContainerSection
