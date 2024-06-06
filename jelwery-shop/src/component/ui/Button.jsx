function Button({ children, type, className, ...props }) {
  let styleCss = 'btn ' + className
  if (type === 'primary') {
    styleCss += ' bg-primary text-white'
  } else if (type === 'secondary') {
    styleCss += ' text-primary border border-secondary'
  }
  return (
    <button className={styleCss} {...props}>
      {children}
    </button>
  )
}

export default Button
