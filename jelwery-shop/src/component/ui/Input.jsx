import { forwardRef } from 'react'
import Label from './Label'

const Input = forwardRef(({ label, id, type = 'text', ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <Label id={id} className="text-third">
        {label}
      </Label>
      <input
        type={type}
        id={id}
        ref={ref}
        required
        className="rounded-lg border-2 border-secondary px-4 py-2 outline-none"
        {...rest}
      />
    </div>
  )
})

export default Input
