import HeadingSection from '../../component/ui/HeadingSection'

function ContainerSection({ title, className, children }) {
  return (
    <section className="mt-[50px] ">
      <HeadingSection title={title} />
      <div
        className={`mt-[20px] grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:justify-between ${className}`}
      >
        {children}
      </div>
    </section>
  )
}

export default ContainerSection
