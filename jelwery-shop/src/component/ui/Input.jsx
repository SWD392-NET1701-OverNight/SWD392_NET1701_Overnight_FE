import { forwardRef } from 'react'
import Label from './Label'

const Input = forwardRef(({ label, id, type = 'text', ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <Label id={id} className="text-third">
        {label}
      </Label>
      <input type={type} id={id} ref={ref} required className="input" {...rest} />
    </div>
  )
})

export default Input
